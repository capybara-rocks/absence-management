import * as redis from 'redis';
import config from '../config';

export const initialize = async () => {
  const redisClient = redis.createClient({ url: config.redisUrl });
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  await redisClient.connect();

  process.on('exit', () => {
    redisClient.quit();
    console.log('redis client quit');
  });

  return redisClient;
};
