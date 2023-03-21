import { RequestHandler } from 'express';
import { CreateLeaveFormDto } from '../dto/leaves/CreateLeaveFormDto';
import { LeaveResponseDto } from '../dto/leaves/LeaveResponseDto';
import bodyValidator from '../middleware/body-validator';
import * as service from '../service/leaves';
import * as authenticator from '@/api/middleware/authenticator';
import { EditLeaveFormDto } from '../dto/leaves/EditLeaveFormDto';
import { HTTP_STATUSES } from '../helper/http-statuses';
import { ForbiddenError } from '../error/ForbiddenError';

const validateOwner: RequestHandler = async (req, res, next) => {
  const leave = await service.findOne(+req.params.id);

  if (req.userFromToken.id === leave.userId) return next();

  throw new ForbiddenError();
};

export const findOne: RequestHandler[] = [
  authenticator.accessToken,
  validateOwner,
  async (req, res) => {
    const leave = await service.findOne(+req.params.id);

    res.json(new LeaveResponseDto(leave));
  },
];

export const findAll: RequestHandler[] = [
  authenticator.accessToken,
  async (req, res) => {
    const leaves = await service.findAll(req.userFromToken.id);

    res.json(leaves.map((l) => new LeaveResponseDto(l)));
  },
];

export const create: RequestHandler[] = [
  authenticator.accessToken,
  bodyValidator(CreateLeaveFormDto),
  async (req, res) => {
    const leave = await service.create(req.userFromToken.id, req.body);

    res.json(new LeaveResponseDto(leave));
  },
];

export const update: RequestHandler[] = [
  authenticator.accessToken,
  validateOwner,
  bodyValidator(EditLeaveFormDto),
  async (req, res) => {
    const leave = await service.update(+req.params.id, req.body);

    res.json(new LeaveResponseDto(leave));
  },
];

export const destroy: RequestHandler[] = [
  authenticator.accessToken,
  validateOwner,
  bodyValidator(EditLeaveFormDto),
  async (req, res) => {
    await service.destroy(+req.params.id);

    res.status(HTTP_STATUSES.NO_CONTENT).send();
  },
];
