import fs from 'fs/promises';
import * as path from 'path';
import { AppDataSource } from '../data/data-source';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

export const getUserById = (id: number) => {
  return userRepository.findOneBy({ id });
};

export const updateUser = async (id: number, form: Partial<User>) => {
  const currentUser = await getUserById(id);
  const currentAvatar = currentUser.avatar;
  const user = userRepository.create(form);

  if (user.password) await user.hashPassword();
  await userRepository.update(id, user);

  if (user.avatar) {
    fs.rm(path.join(__dirname, currentAvatar), { force: true });
  }

  return getUserById(id);
};
