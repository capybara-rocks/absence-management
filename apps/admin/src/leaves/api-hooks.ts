import { useAuth } from '@absence-management/auth';
import useSWR from 'swr';
import { getLeaves, getLeave } from './api';

export const useGetLeaves = () => {
  const { auth } = useAuth();

  return useSWR(['/leaves', auth.accessToken], getLeaves);
};

export const useGetLeave = (id: number | string) => {
  const { auth } = useAuth();

  return useSWR([`/leaves/${id}`, auth.accessToken], () => getLeave(id));
};
