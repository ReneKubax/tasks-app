import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
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
      url: 'http://localhost:5000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

console.log('Inicializando servidor...');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(authMiddleware); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

app.use(errorHandler);

const port = 5000;

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});

exports.api = functions.https.onRequest(app);
