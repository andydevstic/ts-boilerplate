import { injectNamed, provideSingletonNamed } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, BaseControllerMethods, MODEL_NAMES, UserControllerMethods } from '@src/shared/constants';
import { ICrudWorkflowInterceptor, IRouter } from '@src/shared/interfaces';
import { Router } from 'express';

@provideSingletonNamed(API_PROVIDER_TYPES.ROUTER, MODEL_NAMES.USER)
export class UserRouter implements IRouter {
  protected router = Router();

  constructor(
    @injectNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.CRUD_WORKFLOW)
    protected crudWorkflowInterceptor: ICrudWorkflowInterceptor,
  ) {
    this.initRoutes();
  }

  protected initRoutes(): void {
    this.router.get('/', this.crudWorkflowInterceptor.activate(MODEL_NAMES.USER, UserControllerMethods.PAGINATE_UNWATCHED_USERS));
    this.router.get('/history', this.crudWorkflowInterceptor.activate(MODEL_NAMES.USER, UserControllerMethods.PAGINATE_USER_HISTORY));
    this.router.get('/:id', this.crudWorkflowInterceptor.activate(MODEL_NAMES.USER, BaseControllerMethods.FIND_BY_ID));

    this.router.post('/action', this.crudWorkflowInterceptor.activate(MODEL_NAMES.USER, UserControllerMethods.RECORD_USER_ACTION));
  }

  public route(): Router {
    return this.router;
  }
}
