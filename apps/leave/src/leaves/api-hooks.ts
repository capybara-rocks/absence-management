import useSWR from 'swr';
import { getLeaves, getLeave } from './api';

export const useGetLeaves = () => {
  return useSWR('/leaves', getLeaves);
};

export const useGetLeave = (id: number | string) => {
  return useSWR(`/leaves/${id}`, () => getLeave(id));
};
