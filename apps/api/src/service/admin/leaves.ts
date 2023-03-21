import { AppDataSource } from '../../data/data-source';
import { Leave, Status } from '../../entity/Leave';

const leaveRepository = AppDataSource.getRepository(Leave);

export const findAll = () => {
  return leaveRepository.find();
};

export const findOne = (id: number) => {
  return leaveRepository.findOneBy({ id });
};

export const approve = async (id: number, userId: number) => {
  await leaveRepository.update(
    { id },
    {
      status: Status.Approved,
      approvedById: userId,
    }
  );

  return findOne(id);
};

export const reject = async (id: number, userId: number) => {
  await leaveRepository.update(
    { id },
    {
      status: Status.Rejected,
      approvedById: userId,
    }
  );

  return findOne(id);
};
