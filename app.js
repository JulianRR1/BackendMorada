import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
import emergencyRoutes from './routes/emergency.route.js';
import informationRoutes from './routes/information.route.js';
import instanceRoutes from './routes/instance.route.js';
import lineRoutes from './routes/line.route.js';
import responseRoutes from './routes/response.route.js';
import serviceRoutes from './routes/service.route.js';
import surveyRoutes from './routes/survey.route.js';

app.use('/api/intance', instanceRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/line', lineRoutes);
app.use('/api/information', informationRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/response', responseRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
