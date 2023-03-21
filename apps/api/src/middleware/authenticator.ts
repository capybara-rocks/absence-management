import { RequestHandler } from 'express';
import passport from 'passport';
import { compose } from 'compose-middleware';

export const signUp = passport.authenticate('sign-up', { session: false });

export const signIn = passport.authenticate('sign-in', { session: false });

export const accessToken: RequestHandler = compose([
  passport.initialize({ userProperty: 'userFromToken' }),
  passport.authenticate('access-token', {
    session: false,
  }),
]);

export const refreshToken = passport.authenticate('refresh-token', {
  session: false,
});
