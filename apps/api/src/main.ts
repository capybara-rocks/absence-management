import * as dotenv from 'dotenv';
import { AppDataSource } from './data/data-source';
import { createApp } from './helper/create-app';

async function setup() {
  dotenv.config();
  const app = createApp();
  await AppDataSource.initialize();

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
  server.on('error', console.error);
}

setup();
