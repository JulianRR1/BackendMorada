import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { sanitizeBody } from './middleware/sanitize.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerDocument = require("./doc/swagger.json");

dotenv.config();

// Fail-fast: nunca arrancar sin variables críticas
const missingVars = [];
if (!process.env.JWT_SECRET) missingVars.push('JWT_SECRET');
if (!process.env.MONGO_URI) missingVars.push('MONGO_URI');
if (missingVars.length > 0) {
  console.error(`❌ Faltan variables de entorno requeridas: ${missingVars.join(', ')}. Abortando arranque.`);
  console.error('👉 Configúralas en tu archivo .env localmente o en el panel Variables de Railway.');
  process.exit(1);
}

connectDB();

const isProd = process.env.NODE_ENV === 'production';
const BODY_LIMIT = process.env.BODY_LIMIT || '1mb';

// Orígenes permitidos por env (lista separada por comas)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Permite herramientas sin origin (curl, apps móviles nativas, Postman)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');

    // Si no se configuraron orígenes específicos o se usa '*', permitir
    if (allowedOrigins.length === 0 || allowedOrigins.includes('*')) {
      return callback(null, true);
    }

    // Permitir si coincide con la lista (con o sin protocolo)
    const isExplicitlyAllowed = allowedOrigins.some((allowed) => {
      const cleanAllowed = allowed.replace(/\/$/, '');
      return (
        cleanOrigin === cleanAllowed ||
        cleanOrigin === `https://${cleanAllowed}` ||
        cleanOrigin === `http://${cleanAllowed}`
      );
    });
    if (isExplicitlyAllowed) return callback(null, true);

    // Permitir cualquier frontend de Railway (como appmoradaweb-production.up.railway.app)
    
    if (/^https:\/\/.*\.up\.railway\.app$/.test(cleanOrigin)) {
      return callback(null, true);
    }

    // Permitir localhost en desarrollo o pruebas
    if (/^https?:\/\/localhost(:\d+)?$/.test(cleanOrigin) || /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(cleanOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
};

const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors(corsOptions));
app.use(express.json({ limit: BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: BODY_LIMIT }));
app.use(sanitizeBody);

// Rate-limit global suave: frena abuso sin estorbar el uso normal.
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
}));

// Rutas
import emergencyRoutes from './routes/emergency.route.js';
import informationRoutes from './routes/information.route.js';
import instanceRoutes from './routes/instance.route.js';
import lineRoutes from './routes/line.route.js';
import responseRoutes from './routes/response.route.js';
import surveyRoutes from './routes/survey.route.js';
import authRoutes from './routes/auth.routes.js';
import mediaRoutes from './routes/media.routes.js';


app.use('/api/instance', instanceRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/line', lineRoutes);
app.use('/api/information', informationRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/response', responseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

// Documentación Swagger: activa en desarrollo o con ENABLE_SWAGGER=true en producción
const showSwagger = !isProd || process.env.ENABLE_SWAGGER === 'true';
if (showSwagger) {
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/docs.json', (req, res) => res.json(swaggerDocument));
}

// Ruta raíz para verificación de estado (Health Check)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API App Morada activa',
    docs: showSwagger ? '/doc' : 'deshabilitado en producción (usa ENABLE_SWAGGER=true para activarlo)'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  if (err && err.message && err.message.includes('CORS')) {
    return res.status(403).json({ error: 'Acceso denegado por política CORS', origin: req.headers.origin });
  }
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
