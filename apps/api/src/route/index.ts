import express, { Express } from 'express';

import * as v1 from './v1';

export const setup = (app: Express) => {
  const v1Routes = express.Router();
  v1.setup(v1Routes);
  app.use('/v1', v1Routes);
};
