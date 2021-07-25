import { Router } from 'express';

import { injectNamed, provideSingletonNamed } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, BaseControllerMethods, MODEL_NAMES } from '@src/shared/constants';
import { IMiddleware, IRouter } from '@src/shared/interfaces';

@provideSingletonNamed(API_PROVIDER_TYPES.ROUTER, MODEL_NAMES.USER)
export class UserRouter implements IRouter {
  protected router = Router();

  constructor(
    @injectNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.REQUEST_HANDLER)
    protected requestHandler: IMiddleware<[MODEL_NAMES, string]>,
  ) {
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.get('/', this.requestHandler.activate(MODEL_NAMES.USER, BaseControllerMethods.PAGINATE));
    this.router.get('/types', this.requestHandler.activate(MODEL_NAMES.USER, 'getTypes'));
    this.router.get('/:id', this.requestHandler.activate(MODEL_NAMES.USER, BaseControllerMethods.FIND_BY_ID));
    this.router.post('/', this.requestHandler.activate(MODEL_NAMES.USER, BaseControllerMethods.CREATE));
  }

  public route(): Router {
    return this.router;
  }
}
