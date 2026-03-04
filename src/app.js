import express from 'express';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProjectHub API',
      version: '1.0.0',
      description: 'REST API for managing team projects',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Set routes files
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
    },
  },
};

const specs = swaggerJsdoc(options);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5000',
    credentials: true,
  }),
);

app.use(logger);

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

app.use(notFound);
app.use(errorHandler);

export default app;
