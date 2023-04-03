import { useAuth } from '@absence-management/auth';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import { getLeaves, getLeave } from './api';

export const useGetLeaves = () => {
  const { auth } = useAuth();

  return useSWR(['/leaves', auth.accessToken], getLeaves);
};

export const useGetLeave = (id: number | string) => {
  const { auth } = useAuth();
  const key = [`/leaves/${id}`, auth.accessToken];

  return useSWR(key, () => getLeave(id), {
    onError: (error) => {
      if (
        error instanceof AxiosError &&
        !error.request.responseURL.endsWith('/auth/refresh-token') &&
        error.response?.status === 401
      ) {
        toast.error(
          'Please try again as we are currently verifying your profile.'
        );
      }
    },
  });
};
