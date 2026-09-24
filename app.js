import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import RateLimiterMiddleware from './src/middlewares/rateLimit.middleware.js';
import authRoutes from './src/routes/auth.routes.js';
import categoryRoutes from './src/routes/v1/category.routes.js';
import programRoutes from './src/routes/v1/program.routes.js';
import actorRoutes from './src/routes/v1/actor.routes.js';
import producerRoutes from './src/routes/v1/producer.routes.js';
import chapterRoutes from './src/routes/v1/chapter.routes.js';
import characterRoutes from './src/routes/v1/character.routes.js';

dotenv.config();

const app = express();

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'TV Management API',
    version: '1.0.0',
    description: 'API REST para gestión de programas, categorías, actores, productores, capítulos y personajes.'
  },
  servers: [{ url: 'http://localhost:3000/api/v1' }]
};

// Middlewares Globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5500',
  credentials: true
}));

app.use(RateLimiterMiddleware.apiLimiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas Versionadas SemVer (v1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/programs', programRoutes);
app.use('/api/v1/actors', actorRoutes);
app.use('/api/v1/producers', producerRoutes);
app.use('/api/v1/chapters', chapterRoutes);
app.use('/api/v1/characters', characterRoutes);

// Manejo de rutas inexistentes
app.use( (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `No se puede encontrar la ruta ${req.originalUrl} en este servidor.`
  });
});

export default app;