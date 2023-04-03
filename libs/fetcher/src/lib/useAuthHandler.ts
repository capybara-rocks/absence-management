import { useEffectOnce } from 'react-use';
import { useDebouncedCallback } from 'use-debounce';
import api from './fetcher';

export interface UseAuthHandlerProps {
  onUnAuthorized: () => void;
  onRefreshTokenExpired: () => void;
}

export const useAuthHandler = ({
  onUnAuthorized,
  onRefreshTokenExpired,
}: UseAuthHandlerProps) => {
  const debounced = useDebouncedCallback(() => {
    onUnAuthorized();
  }, 250);

  useEffectOnce(() => {
    api.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 401) {
          if (error.request.responseURL.endsWith('/auth/refresh-token')) {
            onRefreshTokenExpired();
          } else {
            debounced();
          }
        }

        return Promise.reject(error);
      }
    );
  });
};

export default useAuthHandler;
