import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import errorHandler from '../middleware/error-handler';
import responseTransformer from '../middleware/response-transformer';
import { setup as setupRoutes } from '../route';
import { setup as setupAuth } from '../helper/auth';

export const createApp = () => {
  const app = express();

  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(responseTransformer);
  setupAuth();
  setupRoutes(app);
  app.use(errorHandler);

  return app;
};

export default createApp;
