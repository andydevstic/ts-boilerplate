import { NextFunction, Response } from 'express';
import { inject, interfaces } from 'inversify';

import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, MODEL_NAMES } from '@src/shared/constants';
import { InternalServerError } from '@src/shared/errors';
import { IMiddleware, IRequest } from '@src/shared/interfaces';
import { provideSingletonNamed } from '../core/ioc/decorators';

@provideSingletonNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.REQUEST_HANDLER)
export class RequestHandlerMiddleware implements IMiddleware<[MODEL_NAMES, string]> {
  constructor(
    @inject(API_PROVIDER_TYPES.CONTAINER)
    protected container: interfaces.Container,
  ) { }

  public activate(controllerName: MODEL_NAMES, handlerName: string) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const controller = this.container.getNamed<any>(API_PROVIDER_TYPES.CONTROLLER, controllerName);

        if (!controller || !controller[handlerName]) {
          return next(new InternalServerError(`Missing handler ${handlerName} for controller ${controllerName}`));
        }

        const handler = controller[handlerName].bind(controller);
        const result = await handler(req);

        res.status(200).json({
          success: true,
          data: result,
        });
      } catch (error) {
        next(error);
      }
    };
  }
}
