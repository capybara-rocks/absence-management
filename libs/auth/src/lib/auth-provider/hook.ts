import { useContext } from 'react';
import AuthContext from './context';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth has to be used within <AuthProvider>');
  }

  return context;
};
