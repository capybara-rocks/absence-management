import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormField } from '@absence-management/ui';
import * as schemas from '../schemas';
import { SignUp } from '../types';
import * as api from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: zodResolver(schemas.signUp),
  });

  const onSubmit: SubmitHandler<SignUp> = async (credentials) => {
    await api.register(credentials);
    toast.success('Your account has already been created.');
    navigate('/auth/sign-in');
  };

  return (
    <form className="mx-auto max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-primary-500 mb-4 text-center text-2xl">Sign Up</h2>
      <FormField
        id="name"
        label="name"
        placeholder="Your awesome name"
        error={errors.name?.message}
        {...register('name')}
      ></FormField>
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
        placeholder="your-password"
        error={errors.password?.message}
        {...register('password')}
      ></FormField>
      <Button type="submit" align="center" color="primary">
        Sign Up
      </Button>
    </form>
  );
}

export default Register;
