import { AppDataSource } from '../data/data-source';
import { Leave } from '../entity/Leave';

const leaveRepository = AppDataSource.getRepository(Leave);

export const findAll = () => {
  return leaveRepository.find();
};

export const findOne = (id: number) => {
  return leaveRepository.findOneBy({ id });
};

export const create = (leave: Partial<Leave>) => {
  return leaveRepository.save(leave);
};

export const update = async (id: number, leave: Partial<Leave>) => {
  await leaveRepository.save({ id, ...leave });

  return await findOne(id);
};

export const destroy = async (id: number) => {
  return leaveRepository.delete(id);
};
