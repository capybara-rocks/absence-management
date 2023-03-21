import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Type } from '@/api/helper/Type';
import { ValidationError } from '@/api/error/ValidationError';

const bodyValidator =
  <T extends Type<object>>(Dto: T): RequestHandler =>
  async (req, _res, next) => {
    const dto = plainToInstance(Dto, req.body, {
      strategy: 'excludeAll',
      exposeUnsetFields: false,
    });
    const errors = await validate(dto);

    if (errors.length > 0) return next(new ValidationError(errors));

    req.body = dto;
    next();
  };

export default bodyValidator;
