import express from 'express';
import cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data/data-source';
import { setup as setupRoutes } from './route';
import bodyParser from 'body-parser';
import errorHandler from './middleware/error-handler';
import responseTransformer from './middleware/response-transformer';
import { redis } from './middleware/cache-handler';

async function setup() {
  dotenv.config();
  const app = express();

  await AppDataSource.initialize();
  app.use(redis);
  app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(responseTransformer);
  setupRoutes(app);
  app.use(errorHandler);

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
  server.on('error', console.error);
}

setup();
