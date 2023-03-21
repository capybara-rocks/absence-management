import { IRouter, RequestHandler } from 'express';

const mapResources = (
  app: IRouter,
  name: string,
  controller: Partial<
    Record<
      'findAll' | 'findOne' | 'create' | 'update' | 'destroy',
      RequestHandler
    >
  >
) => {
  if (controller?.findAll) app.get(name, controller.findAll);
  if (controller?.findOne) app.get(`${name}/:id`, controller.findOne);
  if (controller?.create) app.post(name, controller.create);
  if (controller?.update) app.patch(`${name}/:id`, controller.update);
  if (controller?.destroy) app.delete(`${name}/:id`, controller.destroy);
};

export default mapResources;
