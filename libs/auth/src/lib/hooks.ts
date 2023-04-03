import { useCallback, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useAuth } from './auth-provider/hook';
import { clearRefreshToken, storeRefreshToken } from './helpers';
import * as api from './api';

export const useRefreshToken = () => {
  const { changeAuth } = useAuth();

  const handleRefreshToken = useCallback(async () => {
    try {
      const auth = await api.refreshToken();
      if (!auth) return changeAuth();

      changeAuth(auth);
      storeRefreshToken(auth.refreshToken);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        clearRefreshToken();
      }
    }
  }, [changeAuth]);

  useEffect(() => {
    handleRefreshToken();
  }, [handleRefreshToken]);

  return handleRefreshToken;
};
