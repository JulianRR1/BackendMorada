import { google } from "googleapis";
import fs from "fs";

const MEDIA_CACHE_MAX_AGE = process.env.MEDIA_CACHE_MAX_AGE || "86400"; // 1 día

// Cache singleton para autenticación y cliente de Drive
let driveClientInstance = null;

function getDriveClient() {
  if (driveClientInstance) return driveClientInstance;

  const credentialsEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  let auth;

  if (credentialsEnv) {
    const trimmed = credentialsEnv.trim();
    // Caso 1: En Railway/Cloud se pega el contenido JSON directo en la variable
    if (trimmed.startsWith("{")) {
      try {
        const credentials = JSON.parse(trimmed);
        // Corregir posibles saltos de línea escapados en la clave privada
        if (credentials.private_key) {
          credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
        }
        auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/drive.readonly"],
        });
      } catch (err) {
        console.error("❌ Error al parsear GOOGLE_APPLICATION_CREDENTIALS como JSON:", err.message);
      }
    } else if (fs.existsSync(trimmed)) {
      // Caso 2: Es una ruta de archivo existente en disco (desarrollo local)
      auth = new google.auth.GoogleAuth({
        keyFile: trimmed,
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      });
    } else {
      console.warn(`⚠️ GOOGLE_APPLICATION_CREDENTIALS apunta a una ruta inexistente: "${trimmed}".`);
      console.warn("👉 En Railway, pega el contenido JSON completo de la clave en el valor de la variable.");
    }
  }

  // Fallback: ADC estándar
  if (!auth) {
    auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  }

  driveClientInstance = google.drive({ version: "v3", auth });
  return driveClientInstance;
}

// Los IDs de Google Drive son alfanuméricos con guiones/guiones bajos.
// Validar el formato evita pasar entrada arbitraria a la API (mitiga SSRF).
const VALID_FILE_ID = /^[A-Za-z0-9_-]{10,}$/;

export async function getDriveMedia(req, res) {
  const fileId = req.params.fileId || req.params.id;
  const range = req.headers.range;

  if (!fileId || !VALID_FILE_ID.test(fileId)) {
    return res.status(400).json({ error: "fileId inválido o no proporcionado" });
  }

  try {
    const drive = getDriveClient();

    // 1) Metadatos: tamaño, tipo y checksum para cabeceras correctas
    const metaResp = await drive.files.get({
      fileId,
      fields: "name,size,mimeType,md5Checksum",
      supportsAllDrives: true,
    });
    const meta = metaResp.data;
    const size = parseInt(meta.size || "0", 10);
    const mime = meta.mimeType || "application/octet-stream";

    res.setHeader("Content-Type", mime);
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Cache-Control", `public, max-age=${MEDIA_CACHE_MAX_AGE}`);
    if (meta.md5Checksum) res.setHeader("ETag", meta.md5Checksum);
    // Opcional para inline (navegador): res.setHeader("Content-Disposition", `inline; filename="${encodeURIComponent(meta.name || "file")}"`);

    // 2) Calcular rango (soporte para streaming y reproductores de video/audio)
    let start = 0;
    let end = size ? size - 1 : undefined;

    if (range && size) {
      const m = range.match(/bytes=(\d+)-(\d*)/);
      if (m) {
        start = parseInt(m[1], 10);
        if (m[2]) end = Math.min(parseInt(m[2], 10), size - 1);
        if (start >= size) {
          res.status(416).setHeader("Content-Range", `bytes */${size}`).end();
          return;
        }
      }
    }

    // 3) Pide el stream binario a Drive con alt=media y Range
    const headers = {};
    if (size) headers.Range = `bytes=${start}-${end ?? size - 1}`;

    const dl = await drive.files.get(
      { fileId, alt: "media", supportsAllDrives: true },
      { responseType: "stream", headers }
    );

    // 4) Responder 206 si es parcial; 200 si completo
    if (size && (start > 0 || (end !== undefined && end < size - 1))) {
      const chunkSize = (end ?? size - 1) - start + 1;
      res.status(206);
      res.setHeader("Content-Length", chunkSize);
      res.setHeader("Content-Range", `bytes ${start}-${end ?? size - 1}/${size}`);
    } else if (size) {
      res.setHeader("Content-Length", size);
    }

    dl.data.on("error", (e) => {
      console.error("Drive stream error:", e.message);
      if (!res.headersSent) res.status(502).json({ error: "Error transmitiendo el archivo desde Drive" });
      res.end();
    });

    dl.data.pipe(res);
  } catch (e) {
    console.error("Drive proxy error:", e?.response?.data || e.message);
    if (!res.headersSent) {
      res.status(502).json({
        error: "No se pudo obtener el archivo",
        details: process.env.NODE_ENV !== "production" ? e.message : undefined,
      });
    }
  }
}
