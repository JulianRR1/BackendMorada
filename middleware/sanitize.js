// Saneo NoSQL para Express 5.
// NO usamos express-mongo-sanitize: muta req.query, que es de SOLO LECTURA en
// Express 5 y lanza TypeError. Aquí solo recorremos req.body (mutable) y
// eliminamos claves que empiezan con "$" o contienen ".", que son las que
// permiten inyectar operadores Mongo ($gt, $where, dot-notation, etc.).

function sanitizeValue(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value !== null && typeof value === "object") {
    for (const key of Object.keys(value)) {
      if (key.startsWith("$") || key.includes(".")) {
        delete value[key];
      } else {
        value[key] = sanitizeValue(value[key]);
      }
    }
  }
  return value;
}

export const sanitizeBody = (req, _res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }
  next();
};
