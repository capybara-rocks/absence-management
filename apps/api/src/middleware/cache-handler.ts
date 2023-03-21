import { Request, RequestHandler } from 'express';
import config from '../config';
// import { compose } from 'compose-middleware';
import { initialize } from '../data/redis';

export const redis: RequestHandler = async (req, _res, next) => {
  const redisClient = await initialize();

  req.redis = redisClient;

  next();
};

interface CacheData {
  data: Record<string, unknown>;
  expiresAt: number;
}

const cacheHandler =
  (key: string | ((req: Request) => string)): RequestHandler =>
  async (req, res, next) => {
    const redisClient = req.redis;
    const dataKey = typeof key === 'function' ? key(req) : key;
    const cachedData = await redisClient.get(dataKey);

    if (cachedData) {
      const dataValue = JSON.parse(cachedData) as CacheData;

      if (dataValue && dataValue.expiresAt > +new Date()) {
        return res.json(dataValue.data);
      }
    }

    const oldJson = res.json;
    res.json = (body) => {
      redisClient.set(
        dataKey,
        JSON.stringify({
          data: body,
          expiresAt: +new Date(Date.now() + config.cacheExpiresIn * 60 * 1000),
        })
      );

      return oldJson.call(res, body);
    };

    next();
  };

export default cacheHandler;

// const get =
//   (key: string | ((req: Request) => string)): RequestHandler =>
//   async (req, res, next) => {
//     if (req.method !== 'GET') return next();

//     const redisClient = req.redis;
//     const dataKey = typeof key === 'function' ? key(req) : key;
//     const dataValue = await redisClient.get(dataKey);

//     if (dataValue) res.json(dataValue);

//     next();
//   };

// interface SetOptions {
//   setIfNotExists: boolean;
// }

// const set =
//   (
//     key: string | ((req: Request) => string),
//     options?: SetOptions
//   ): RequestHandler =>
//   async (req, res, next) => {
//     const redisClient = req.redis;
//     const dataKey = typeof key === 'function' ? key(req) : key;
//     const dataValue = redisClient.get(dataKey);

//     if (dataValue && options?.setIfNotExists) return next();

//     const oldJson = res.json;
//     res.json = (body) => {
//       redisClient.set(dataKey, JSON.stringify(body));
//       return oldJson.call(res, body);
//     };

//     next();
//   };

// const cacheHandler = (
//   key: string | ((req: Request) => string),
//   options?: SetOptions
// ): RequestHandler => compose(get(key), set(key, options));

// cacheHandler.get = get;
// cacheHandler.set = set;

// export default cacheHandler;
