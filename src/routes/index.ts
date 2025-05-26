import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import NewsRouter from './newsRoutes';
import morgan from 'morgan';
import helment from 'helmet';

export const setupRoutes = (app: Application): void => {
  app.set('trust proxy', 1);
  app.use(helment());
  app.use(express.json());
  app.use(cors())
  app.use(morgan('dev'));
  app.use('/api/v1/news', NewsRouter); 
};
