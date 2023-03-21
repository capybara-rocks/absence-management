import { useState, ReactNode, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearRefreshToken, retrieveRefreshToken } from '../helpers';
import AuthContext, { AuthContextValueType } from './context';
import * as api from '../api';

interface AuthProviderProps {
  onAuthChanged?: (auth: AuthContextValueType) => void;
  children: ReactNode;
}

export function AuthProvider({ onAuthChanged, children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthContextValueType>({
    refreshToken: retrieveRefreshToken(),
    isLoaded: false,
  });

  const changeAuth = useCallback(
    (changedAuth?: Omit<AuthContextValueType, 'isLoaded'>) => {
      const value = { ...auth, ...changedAuth, isLoaded: true };
      setAuth(value);
      onAuthChanged?.(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onAuthChanged]
  );

  const resetAuth = useCallback(() => {
    const value = { isLoaded: true };
    setAuth(value);
    onAuthChanged?.(value);
  }, [onAuthChanged]);

  const logout = useCallback(async () => {
    const value = { isLoaded: true };
    await api.logout();
    setAuth(value);
    onAuthChanged?.(value);
    clearRefreshToken();
    navigate('/', { replace: true });
  }, [navigate, onAuthChanged]);

  const value = useMemo(
    () => ({
      auth,
      changeAuth,
      resetAuth,
      logout,
    }),
    [auth, changeAuth, logout, resetAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
