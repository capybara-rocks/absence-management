import * as z from 'zod';
import * as schemas from './schemas';

export type SignUp = z.infer<typeof schemas.signUp>;

export type SignIn = z.infer<typeof schemas.signIn>;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: number;
  avatar?: string;
}
