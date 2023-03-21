import express from 'express';
import * as leavesController from '../controller/leaves';

export const setup = (router: express.Router) => {
  router.get('/leaves', leavesController.findAll);
  router.get('/leaves/:id', leavesController.findOne);
  router.patch('/leaves/:id', leavesController.update);
  router.delete('/leaves/:id', leavesController.destroy);
  router.post('/leaves', leavesController.create);
};
