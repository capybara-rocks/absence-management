import { RequestHandler } from 'express';
import config from '../config';
import { initialize } from '../data/redis';

export const redis: RequestHandler = async (req, _res, next) => {
  const redisClient = await initialize();

  req.redis = redisClient;

  next();
};
