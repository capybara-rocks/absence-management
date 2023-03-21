import { RequestHandler } from 'express';
import { instanceToPlain } from 'class-transformer';

const responseTransformer: RequestHandler = (_req, res, next) => {
  const oldJson = res.json;
  res.json = (body) => {
    if ('errors' in body) return oldJson.call(res, body);

    return oldJson.call(
      res,
      instanceToPlain(body, {
        strategy: 'excludeAll',
      })
    );
  };

  next();
};

export default responseTransformer;
