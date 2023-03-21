import { fetcher } from '@absence-management/fetcher';
import { Leave } from './types';

export const approveLeave = async (id: number | string) => {
  const { data } = await fetcher.patch<Leave>(`/admin/leaves/${id}/approve`);

  return data;
};

export const rejectLeave = async (id: number | string) => {
  const { data } = await fetcher.patch<Leave>(`/admin/leaves/${id}/reject`);

  return data;
};

export const getLeaves = async () => {
  const { data } = await fetcher.get<Leave[]>('/admin/leaves');

  return data;
};

export const getLeave = async (id: number | string) => {
  const { data } = await fetcher.get<Leave>(`/admin/leaves/${id}`);

  return data;
};
