import { AppDataSource } from '../data/data-source';
import { Leave, Status } from '../entity/Leave';

const leaveRepository = AppDataSource.getRepository(Leave);

export const findAll = (userId: number) => {
  return leaveRepository.find({ where: { userId } });
};

export const findOne = (id: number) => {
  return leaveRepository.findOneBy({ id });
};

export const create = (userId: number, leave: Partial<Leave>) => {
  leave.userId = userId;

  return leaveRepository.save(leave);
};

export const update = async (id: number, leave: Partial<Leave>) => {
  await leaveRepository.update(id, leave);

  return await findOne(id);
};

export const destroy = async (id: number) => {
  const leave = await findOne(id);

  if (leave.status !== Status.Pending) return;
  return leaveRepository.delete(id);
};
