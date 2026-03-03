import express from 'express';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(logger);

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
