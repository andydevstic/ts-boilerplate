import { NextFunction, Response } from 'express';

import { IMiddleware, IParser, IRequest } from '@src/shared/interfaces';
import { provideSingletonNamed } from '../core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from '@src/shared/constants';
import { Container, inject } from 'inversify';

@provideSingletonNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.REQUEST_CONTEXT)
export class RequestContextMiddleware implements IMiddleware<[void]> {
  constructor(
    @inject(API_PROVIDER_TYPES.CONTAINER)
    protected container: Container,
  ) {}

  public activate() {
    return (req: IRequest, _: Response, next: NextFunction) => {
      try {
        const queryParser = this.container.getNamed<IParser>(API_PROVIDER_TYPES.PARSER, API_PROVIDER_NAMES.API_QUERY_STRING);

        req.context = {
          queryString: queryParser.parse(req.query),
        };

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
