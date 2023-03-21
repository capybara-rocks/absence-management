import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, FormField } from '@absence-management/ui';
import { ChangeEventHandler, useRef } from 'react';
import avatarUrl from '../../assets/images/avatar.jpg';
import { fetcher } from '@absence-management/fetcher';
import { useAuth } from '../auth-provider/hook';
import * as helpers from '../helpers';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 1_000 * 1_000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  password: z.string().min(8).optional().or(z.literal('')),
  avatar: z
    .custom<File | null>(
      (avatar) => avatar instanceof File,
      'Avatar is required.'
    )
    .refine(
      (avatar) => avatar && avatar.size <= MAX_FILE_SIZE,
      'Max file size is 1 MB.'
    )
    .refine(
      (avatar) => avatar && ACCEPTED_IMAGE_TYPES.includes(avatar.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    )
    .nullable(),
});

type ProfileFields = z.infer<typeof schema>;

export function Profile() {
  const navigate = useNavigate();
  const { auth, changeAuth } = useAuth();
  const avatarPreviewRef = useRef<HTMLImageElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFields>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: { avatar: null },
  });

  const previewAvatar: ChangeEventHandler<HTMLInputElement> = (event) => {
    const avatar = event.target.files?.[0];

    if (!avatar) return;
    if (!avatarPreviewRef.current)
      throw Error('avatarPreviewRef is not assigned');

    setValue('avatar', avatar, { shouldValidate: true });
    avatarPreviewRef.current.src = URL.createObjectURL(avatar);
  };

  const updateProfile: SubmitHandler<ProfileFields> = async (profile) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(profile)) {
      if (value) formData.append(key, value);
    }

    const { data: user } = await fetcher.patch('/auth/profile', formData);
    changeAuth({ user });
    toast.success('Your profile has already updated.');
    navigate('/');
  };

  useEffect(() => {
    const { user } = auth;
    if (!user) return;

    setValue('name', user.name);
    setValue('email', user.email);

    if (!avatarPreviewRef.current) {
      throw Error('avatarPreviewRef is not assigned');
    }
    if (user.avatar) {
      avatarPreviewRef.current.src = helpers.avatarUrl(user.avatar);
    }
  }, [auth, setValue]);

  return (
    <div className="mx-auto max-w-lg">
      <form onSubmit={handleSubmit(updateProfile)}>
        <div className="center mx-auto py-3">
          <div className="mx-auto w-48 rounded-lg bg-white px-4 py-5 text-center shadow-lg">
            <div className="mb-4">
              <img
                ref={avatarPreviewRef}
                className="mx-auto w-auto rounded-full object-cover object-center"
                src={avatarUrl}
                alt="Avatar Upload"
              />
            </div>
            <label className="mt-6 cursor-pointer">
              <span className="mt-2 rounded-full bg-blue-500 px-4 py-2 text-sm leading-normal text-white">
                Select Avatar
              </span>
              <input
                type="file"
                {...register('avatar')}
                accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                onChange={previewAvatar}
                className="hidden"
              />
            </label>
            <div className="mt-2 text-sm text-red-500">
              {errors.avatar?.message}
            </div>
          </div>
        </div>
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
          placeholder="your-password-8-chars-at-least"
          error={errors.password?.message}
          {...register('password')}
        ></FormField>
        <Button type="submit" align="center">
          Update Profile
        </Button>
      </form>
    </div>
  );
}

export default Profile;
