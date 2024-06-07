import express from 'express';
import cors, { CorsOptionsDelegate } from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import authMiddleware from './middleware/authMiddleware';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task API',
    version: '1.0.0',
    description: 'API para gestionar tareas',
  },
  servers: [
    {
      url: process.env.PORT || 'http://localhost:5000',
    },
  ],
};

const allowedOrigins = ['http://localhost:4200', 'https://task-app-rene.netlify.app'];

const corsOptions: CorsOptionsDelegate = (req, callback) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, { origin: true });
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

console.log('Inicializando servidor...');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(authMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/tasks', authMiddleware, taskRoutes)
app.use('/api', userRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});

export default app;
