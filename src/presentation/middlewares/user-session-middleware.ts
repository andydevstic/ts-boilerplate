import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, MODEL_NAMES } from "@src/shared/constants";
import { UnauthorizedError } from "@src/shared/errors";
import { ICrudService, IJwtService, IMiddleware, IRequest, IUser } from "@src/shared/interfaces";
import { NextFunction, Response } from "express";
import { injectNamed, provideSingletonNamed } from "../core/ioc/decorators";

@provideSingletonNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.USER_SESSION)
export class UserSessionMiddleware implements IMiddleware<[void]> {
  constructor(
    @injectNamed(API_PROVIDER_TYPES.SERVICE, MODEL_NAMES.USER)
    protected userService: ICrudService<IUser> & { findByEmail(email: string): Promise<IUser> },

    @injectNamed(API_PROVIDER_TYPES.SERVICE, API_PROVIDER_NAMES.JWT)
    protected jwtService: IJwtService,
  ) {}

  public activate() {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const jwt = req.header('Authorization');

        if (!jwt) {
          return next();
        }

        const sessionUser = await this.jwtService.verify(jwt);
        const user = await this.userService.findByEmail(sessionUser.email);

        if (!user) {
          throw new UnauthorizedError('You are not authorized');
        }

        req.context.user = user;

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
