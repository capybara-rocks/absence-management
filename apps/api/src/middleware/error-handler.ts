import { ErrorRequestHandler } from 'express';
import { QueryFailedError } from 'typeorm';
import { ForbiddenError } from '../error/ForbiddenError';
import { ValidationError } from '../error/ValidationError';
import { HTTP_STATUSES } from '../helper/http-statuses';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: err.errors });
  }

  if (err instanceof QueryFailedError) {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: err.message });
  }

  if (err instanceof ForbiddenError) {
    res.status(HTTP_STATUSES.FORBIDDEN).json({ errors: err.message });
  }

  next(err);
};

export default errorHandler;
