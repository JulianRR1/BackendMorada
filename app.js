import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./doc/swagger.json" with { type: "json" };

dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" })); // Increase the limit for JSON payloads
app.use(express.urlencoded({ extended: true, limit: "100mb" }))

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

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/docs.json', (req, res) => res.json(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
