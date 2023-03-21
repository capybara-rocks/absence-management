import { fetcher } from '@absence-management/fetcher';
import { retrieveRefreshToken } from './helpers';
import { LoginResponse, SignIn, SignUp } from './types';

export const register = async (credentials: SignUp) => {
  await fetcher.post('/auth/sign-up', credentials);
};

export const login = async (credentials: SignIn) => {
  const { data } = await fetcher.post<LoginResponse>(
    '/auth/sign-in',
    credentials
  );

  return data;
};

export const logout = async () => {
  const { data } = await fetcher.delete('/auth/sign-out');

  return data;
};

export const refreshToken = async () => {
  const refreshToken = retrieveRefreshToken();

  if (!refreshToken) return;

  const { data } = await fetcher.post<LoginResponse>('/auth/refresh-token', {
    refreshToken,
  });

  return data;
};
