import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { sanitizeBody } from './middleware/sanitize.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./doc/swagger.json" with { type: "json" };

dotenv.config();

// Fail-fast: nunca arrancar sin secreto de firma JWT.
if (!process.env.JWT_SECRET) {
  console.error('❌ Falta JWT_SECRET. Abortando arranque.');
  process.exit(1);
}

connectDB();

const isProd = process.env.NODE_ENV === 'production';
const BODY_LIMIT = process.env.BODY_LIMIT || '1mb';

// Orígenes permitidos por env (lista separada por comas). En desarrollo se
// permite además localhost para no estorbar el trabajo local.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Permite herramientas sin origin (curl, apps móviles nativas).
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (!isProd && /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origen no permitido por CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

const app = express();
app.use(helmet());
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

// Documentación Swagger solo fuera de producción (no exponer la superficie del API).
if (!isProd) {
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.get('/docs.json', (req, res) => res.json(swaggerDocument));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
