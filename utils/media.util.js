import jwt from "jsonwebtoken";

const MEDIA_BASE_PATH = process.env.MEDIA_BASE_PATH || ""

/** Extrae fileId de varios formatos de URL de Drive */
export function extractDriveFileId(rawUrl = "") {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname || "";
    if (!/drive\.google\.com|docs\.google\.com/i.test(host)) return null;

    // /file/d/<id>/...
    const m1 = u.pathname.match(/\/file\/d\/([^/]+)\//);
    if (m1 && m1[1]) return m1[1];

    // ?id=<id> (open|uc)
    const id = u.searchParams.get("id");
    if (id) return id;

    return null;
  } catch {
    return null;
  }
}

function isAlreadyProxied(url = "") {
  try {
    // Acepta tanto con prefijo configurado como sin él
    return url.startsWith(`${MEDIA_BASE_PATH}/media/drive/`) || url.startsWith(`/media/drive/`);
  } catch {
    return false;
  }
}

export function toProxyUrl(originalUrl) {
  if (!originalUrl) return originalUrl;
  if (isAlreadyProxied(originalUrl)) return originalUrl; // idempotencia

  const fileId = extractDriveFileId(originalUrl);
  return fileId ? `${MEDIA_BASE_PATH}/media/drive/${fileId}` : originalUrl;
}

/** Information: reescribe en raíz + secciones */
export function decorateInformationDoc(doc) {
  if (!doc) return doc;
  const d = doc.toObject ? doc.toObject() : { ...doc };

  if (d.imageUrl) d.imageUrl = toProxyUrl(d.imageUrl);
  if (d.fileUrl) d.fileUrl = toProxyUrl(d.fileUrl);
  if (d.videoUrl) d.videoUrl = toProxyUrl(d.videoUrl);

  if (Array.isArray(d.description)) {
    d.description = d.description.map((sec) => {
      const s = { ...sec };
      if (s.imageUrl) s.imageUrl = toProxyUrl(s.imageUrl);
      if (s.videoUrl) s.videoUrl = toProxyUrl(s.videoUrl);
      return s;
    });
  }
  return d;
}

/** Response: solo tiene videoUrl a nivel raíz */
export function decorateResponseDoc(doc) {
  if (!doc) return doc;
  const d = doc.toObject ? doc.toObject() : { ...doc };
  if (d.videoUrl) d.videoUrl = toProxyUrl(d.videoUrl);
  return d;
}

export function decorateSurveyDoc(doc) {
  if (!doc) return doc;
  const d = doc.toObject ? doc.toObject() : { ...doc };
  if (d.videoUrl) d.videoUrl = toProxyUrl(d.videoUrl);
  return d;
}


