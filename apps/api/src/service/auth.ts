import jwt from 'jsonwebtoken';
import config from '../config';
import { AppDataSource } from '../data/data-source';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

export const signAndSaveTokens = (user: User) => {
  const accessToken = jwt.sign(
    { sub: user.id, role: user.role },
    config.secretKey.accessToken,
    { expiresIn: config.expiresIn.accessToken }
  );
  const refreshToken = jwt.sign(
    { sub: user.id },
    config.secretKey.accessToken,
    { expiresIn: config.expiresIn.refreshToken }
  );

  user.refreshToken = refreshToken;
  userRepository.save(user);

  return { accessToken, refreshToken };
};

export const signOut = async (userId: number) => {
  await userRepository.update({ id: userId }, { refreshToken: null });
};
