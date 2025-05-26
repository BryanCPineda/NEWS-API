import express, { Application } from 'express';
import { setupRoutes } from './routes';
import swaggerUi from 'swagger-ui-express'
import { specs } from './config/swagger';
import config from './config/config';

const app: Application = express();

if(config.enableSwagger === true) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
setupRoutes(app);

export default app;
