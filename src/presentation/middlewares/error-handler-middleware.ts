import { Response, NextFunction } from 'express';

import { ILogger, IMiddleware, IRequest } from '@src/shared/interfaces';
import { injectNamed, provideSingletonNamed } from '../core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from '@src/shared/constants';

@provideSingletonNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.ERROR_HANDLER)
export class ErrorHandlerMiddleware implements IMiddleware<[void]> {
  constructor(
    @injectNamed(API_PROVIDER_TYPES.LOGGER, API_PROVIDER_NAMES.LOG4JS)
    protected logger: ILogger,
  ) {}

  public activate() {
    return (error: any, req: IRequest, res: Response, next: NextFunction) => {
      if (error.isCustomError) {
        res.status(error.status).json({
          message: error.message,
          details: error.details,
          type: error.type,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
      }

      this.logger.error(`Error: ${error.message}, Body: ${JSON.stringify({ body: req.body, params: req.params, query: req.query })}`);
      this.logger.error(error.stack);
    };
  }
}
