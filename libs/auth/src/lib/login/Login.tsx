import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '@absence-management/ui';
import { Button } from '@absence-management/ui';
import * as schemas from '../schemas';
import { SignIn } from '../types';
import * as api from '../api';
import { useAuth } from '../auth-provider/hook';
import { storeRefreshToken } from '../helpers';

export function Login() {
  const navigate = useNavigate();
  const { changeAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignIn>({
    resolver: zodResolver(schemas.signIn),
  });

  const onSubmit: SubmitHandler<SignIn> = async (credentials) => {
    try {
      const auth = await api.login(credentials);
      changeAuth(auth);
      storeRefreshToken(auth.refreshToken);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('Invalid username or password');
        reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg">
      <h2 className="text-primary-500 mb-4 text-center text-2xl">Sign In</h2>
      <FormField
        id="email"
        type="email"
        label="email"
        placeholder="your@email.com"
        error={errors.email?.message}
        {...register('email')}
      ></FormField>
      <FormField
        id="password"
        type="password"
        label="password"
        placeholder="your-password-8-chars-at-least"
        error={errors.password?.message}
        {...register('password')}
      ></FormField>
      <Button type="submit" align="center" color="primary">
        Sign In
      </Button>
    </form>
  );
}

export default Login;
