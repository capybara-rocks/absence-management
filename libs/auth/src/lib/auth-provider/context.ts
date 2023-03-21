import { createContext } from 'react';
import { UserProfile } from '../types';

export interface AuthContextValueType {
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: UserProfile;
  isLoaded: boolean;
}

export interface AuthContextType {
  auth: AuthContextValueType;
  changeAuth: (auth?: Omit<AuthContextValueType, 'isLoaded'>) => void;
  resetAuth: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
