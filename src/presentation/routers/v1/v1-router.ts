import { Router } from 'express';

import { injectNamed, provideSingletonNamed } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, MODEL_NAMES } from '@src/shared/constants';
import { IMiddleware, IRouter } from '@src/shared/interfaces';

@provideSingletonNamed(API_PROVIDER_TYPES.ROUTER, API_PROVIDER_NAMES.V1)
export class V1Router implements IRouter {
  protected v1Router = Router();

  constructor(
    @injectNamed(API_PROVIDER_TYPES.ROUTER, MODEL_NAMES.USER)
    protected userRouter: IRouter,

    @injectNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.REQUEST_CONTEXT)
    protected requestContextMiddleware: IMiddleware<[void]>,

    @injectNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.USER_SESSION)
    protected userSessionMiddleware: IMiddleware<[void]>,
  ) {
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.v1Router.use(this.requestContextMiddleware.activate());
    this.v1Router.use(this.userSessionMiddleware.activate());

    this.v1Router.use('/users', this.userRouter.route());
  }

  public route(): Router {
    return this.v1Router;
  }
}
