import { LeaveResponseDto } from '@/api/dto/leaves/LeaveResponseDto';
import { RequestHandler } from 'express';
import * as service from '@/api/service/admin/leaves';
import * as authenticator from '@/api/middleware/authenticator';
import authorizer from '@/api/middleware/authorizer';
import { Role } from '@/api/entity/User';

export const findOne: RequestHandler[] = [
  authenticator.accessToken,
  authorizer([Role.Admin, Role.Manager]),
  async (req, res) => {
    const leave = await service.findOne(+req.params.id);

    res.json(new LeaveResponseDto(leave));
  },
];

export const findAll: RequestHandler[] = [
  authenticator.accessToken,
  authorizer([Role.Admin, Role.Manager]),
  async (_req, res) => {
    const leaves = await service.findAll();

    res.json(leaves.map((l) => new LeaveResponseDto(l)));
  },
];

export const approve: RequestHandler[] = [
  authenticator.accessToken,
  authorizer([Role.Admin]),
  async (req, res) => {
    const leave = await service.approve(+req.params.id, req.userFromToken.id);

    res.json(new LeaveResponseDto(leave));
  },
];

export const reject: RequestHandler[] = [
  authenticator.accessToken,
  authorizer([Role.Admin]),
  async (req, res) => {
    const leave = await service.reject(+req.params.id, req.userFromToken.id);

    res.json(new LeaveResponseDto(leave));
  },
];
