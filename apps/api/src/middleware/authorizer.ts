import { RequestHandler } from 'express';
import { Role } from '../entity/User';
import { HTTP_STATUSES } from '../helper/http-statuses';
import { accessToken } from './authenticator';

export const permitFor = (roles: Role | Role[]) => [
  accessToken,
  authorizer(roles),
];

const authorizer =
  (roles: Role | Role[]): RequestHandler =>
  (req, res, next) => {
    const role = req.userFromToken.role;

    if (role == null) return res.sendStatus(HTTP_STATUSES.FORBIDDEN);
    if (Array.isArray(roles) && roles.includes(role)) return next();
    if (roles === role) return next();

    return res.sendStatus(HTTP_STATUSES.FORBIDDEN);
  };

export default authorizer;
