import express from 'express';
import * as authController from '../controller/auth';
import * as leavesController from '../controller/leaves';
import * as adminLeavesController from '../controller/admin/leaves';

export const setup = (router: express.Router) => {
  router.get('/admin/leaves', adminLeavesController.findAll);
  router.get('/admin/leaves/:id', adminLeavesController.findOne);
  router.patch('/admin/leaves/:id/approve', adminLeavesController.approve);
  router.patch('/admin/leaves/:id/reject', adminLeavesController.reject);

  router.get('/leaves', leavesController.findAll);
  router.get('/leaves/:id', leavesController.findOne);
  router.patch('/leaves/:id', leavesController.update);
  router.delete('/leaves/:id', leavesController.destroy);
  router.post('/leaves', leavesController.create);
  router.post('/auth/sign-up', authController.register);
  router.post('/auth/sign-in', authController.login);
  router.get('/auth/profile', authController.getProfile);
  router.patch('/auth/profile', authController.updateProfile);
  router.post('/auth/refresh-token', authController.refreshToken);
  router.delete('/auth/sign-out', authController.signOut);
};
