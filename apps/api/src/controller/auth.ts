import { RequestHandler } from 'express';
import multer from 'multer';
import * as path from 'path';
import bodyValidator from '@/api/middleware/body-validator';
import * as authenticator from '@/api/middleware/authenticator';
import { LoginResponseDto } from '../dto/auth/LoginResponseDto';
import { UserResponseDto } from '../dto/users/UserResponseDto';
import { HTTP_STATUSES } from '../helper/http-statuses';
import * as authService from '../service/auth';
import * as userService from '../service/users';
import { UpdateProfileFormDto } from '../dto/auth/UpdateProfileFormDto';
import { SignUpFormDto } from '../dto/auth/SignUpFormDto';
import { RefreshTokenFormDto } from '../dto/auth/RefreshTokenFormDto';

const upload = multer({ dest: path.join(__dirname, 'uploads', 'users') });

export const register: RequestHandler[] = [
  bodyValidator(SignUpFormDto),
  authenticator.signUp,
  async (req, res) => {
    res.status(HTTP_STATUSES.CREATED).json(new UserResponseDto(req.user));
  },
];

export const login: RequestHandler[] = [
  authenticator.signIn,
  async (req, res, next) => {
    const user = req.user;

    req.login(user, { session: false }, async (error) => {
      if (error) return next(error);

      const { accessToken, refreshToken } = authService.signAndSaveTokens(user);
      return res
        .status(HTTP_STATUSES.CREATED)
        .json(new LoginResponseDto(accessToken, refreshToken, user));
    });
  },
];

export const getProfile: RequestHandler[] = [
  authenticator.accessToken,
  async (req, res) => {
    const user = await userService.getUserById(req.userFromToken.id);
    res.json(new UserResponseDto(user));
  },
];

export const updateProfile: RequestHandler[] = [
  upload.single('avatar'),
  authenticator.accessToken,
  bodyValidator(UpdateProfileFormDto),
  async (req, res) => {
    const payload: UpdateProfileFormDto & { avatar: string } = req.body;
    if (req.file) payload.avatar = `uploads/users/${req.file.filename}`;
    const user = await userService.updateUser(req.userFromToken.id, payload);
    res.json(new UserResponseDto(user));
  },
];

export const refreshToken: RequestHandler[] = [
  bodyValidator(RefreshTokenFormDto),
  authenticator.refreshToken,
  async (req, res) => {
    const user = req.user;

    const { accessToken, refreshToken } = authService.signAndSaveTokens(user);
    return res
      .status(HTTP_STATUSES.CREATED)
      .json(new LoginResponseDto(accessToken, refreshToken, user));
  },
];

export const signOut: RequestHandler[] = [
  authenticator.accessToken,
  async (req, res) => {
    await authService.signOut(+req.userFromToken.id);
    res.status(HTTP_STATUSES.NO_CONTENT).send();
  },
];
