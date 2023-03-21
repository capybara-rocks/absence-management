import { fetcher } from '@absence-management/fetcher';
import { CreateLeave, EditLeave, Leave } from './types';

export const createLeave = async (leave: CreateLeave) => {
  const { data } = await fetcher.post<Leave>('/leaves', leave);

  return data;
};

export const editLeave = async (id: number | string, leave: EditLeave) => {
  const { data } = await fetcher.patch<Leave>(`/leaves/${id}`, leave);

  return data;
};

export const deleteLeave = async (id: number | string) => {
  const { data } = await fetcher.delete<Leave>(`/leaves/${id}`);

  return data;
};

export const getLeaves = async () => {
  const { data } = await fetcher.get<Leave[]>('/leaves');

  return data;
};

export const getLeave = async (id: number | string) => {
  const { data } = await fetcher.get<Leave>(`/leaves/${id}`);

  return data;
};
