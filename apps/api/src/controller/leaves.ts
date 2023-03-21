import { RequestHandler } from 'express';
import { CreateLeaveFormDto } from '../dto/leaves/CreateLeaveFormDto';
import { LeaveResponseDto } from '../dto/leaves/LeaveResponseDto';
import bodyValidator from '../middleware/body-validator';
import * as service from '../service/leaves';
import { EditLeaveFormDto } from '../dto/leaves/EditLeaveFormDto';
import { HTTP_STATUSES } from '../helper/http-statuses';

export const findOne: RequestHandler[] = [
  (req, res) => {
    const leave = service.findOne(+req.params.id);

    res.json(new LeaveResponseDto(leave));
  },
];

export const findAll: RequestHandler[] = [
  (_req, res) => {
    const leaves = service.findAll();

    res.json(leaves.map((l) => new LeaveResponseDto(l)));
  },
];

export const create: RequestHandler[] = [
  bodyValidator(CreateLeaveFormDto),
  (req, res) => {
    const leave = service.create(req.body);

    res.json(new LeaveResponseDto(leave));
  },
];

export const update: RequestHandler[] = [
  bodyValidator(EditLeaveFormDto),
  (req, res) => {
    const leave = service.update(+req.params.id, req.body);

    res.json(new LeaveResponseDto(leave));
  },
];

export const destroy: RequestHandler[] = [
  bodyValidator(EditLeaveFormDto),
  (req, res) => {
    service.destroy(+req.params.id);

    res.status(HTTP_STATUSES.NO_CONTENT).send();
  },
];
