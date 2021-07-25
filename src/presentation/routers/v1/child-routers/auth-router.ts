import { Router } from 'express';

import { injectNamed, provideSingletonNamed } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from '@src/shared/constants';
import { IMiddleware, IRouter } from '@src/shared/interfaces';

@provideSingletonNamed(API_PROVIDER_TYPES.ROUTER, API_PROVIDER_NAMES.AUTH)
export class AuthRouter implements IRouter {
  protected router = Router();

  constructor(
    @injectNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.REQUEST_HANDLER)
    protected requestHandler: IMiddleware<[string, string]>,
  ) {
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.post('/register', this.requestHandler.activate(API_PROVIDER_NAMES.AUTH, 'register'));
    this.router.post('/login', this.requestHandler.activate(API_PROVIDER_NAMES.AUTH, 'login'));
  }

  public route(): Router {
    return this.router;
  }
}
