import { repositories } from '@/api/data/data-source';
import { Leave, Status } from '../entity/Leave';

export const findAll = (userId: number) => {
  return repositories.leave.find({ where: { userId } });
};

export const findOne = (id: number) => {
  return repositories.leave.findOneBy({ id });
};

export const create = (userId: number, leave: Partial<Leave>) => {
  leave.userId = userId;

  return repositories.leave.save(leave);
};

export const update = async (id: number, leave: Partial<Leave>) => {
  await repositories.leave.update(id, leave);

  return await findOne(id);
};

export const destroy = async (id: number) => {
  const leave = await findOne(id);

  if (leave.status !== Status.Pending) return;
  return repositories.leave.delete(id);
};
