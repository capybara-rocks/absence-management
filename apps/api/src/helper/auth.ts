import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt';

import { AppDataSource } from '@/api/data/data-source';
import { User } from '@/api/entity/User';
import { SignUpFormDto } from '../dto/auth/SignUpFormDto';
import config from '@/api/config';

export const setup = () => {
  const userRepository = AppDataSource.getRepository(User);

  passport.use(
    'sign-up',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (
        req: Request<unknown, unknown, SignUpFormDto>,
        email,
        password,
        done
      ) => {
        try {
          const user = userRepository.create({
            email,
            password,
            name: req.body.name,
          });
          await userRepository.save(user);
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'sign-in',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await userRepository.findOneBy({ email });

          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }

          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    'access-token',
    new JwtStrategy(
      {
        secretOrKey: config.secretKey.accessToken,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, {
            id: token.sub,
            role: token.role,
          } as Express.User);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'refresh-token',
    new JwtStrategy(
      {
        secretOrKey: config.secretKey.refreshToken,
        jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
        passReqToCallback: true,
      },
      async (req: Request, _token: null, done: VerifiedCallback) => {
        try {
          const refreshToken = req.body.refreshToken;
          const user = await userRepository.findOneBy({ refreshToken });

          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
