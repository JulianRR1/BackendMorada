import { google } from "googleapis";

const MEDIA_CACHE_MAX_AGE = process.env.MEDIA_CACHE_MAX_AGE || "86400"; // 1 día

// Usa ADC o GOOGLE_APPLICATION_CREDENTIALS con un Service Account
const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});
const drive = google.drive({ version: "v3", auth });


export async function getDriveMedia(req, res) {
  const { fileId } = req.params;
  const range = req.headers.range;

  try {
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
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Cache-Control", `public, max-age=${MEDIA_CACHE_MAX_AGE}`);
    if (meta.md5Checksum) res.setHeader("ETag", meta.md5Checksum);
    // Opcional para inline (navegador): res.setHeader("Content-Disposition", `inline; filename="${encodeURIComponent(meta.name || "file")}"`);

    // 2) Calcular rango
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
      if (!res.headersSent) res.status(502);
      res.end();
    });

    dl.data.pipe(res);
  } catch (e) {
    // 403 (permisos), 404 (no existe), o cuotas
    console.error("Drive proxy error:", e?.response?.data || e.message);
    res.status(502).json({ error: "Upstream Drive error" });
  }
}
