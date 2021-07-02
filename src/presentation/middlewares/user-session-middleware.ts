import { UserModel } from "@src/models";
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, MODEL_NAMES } from "@src/shared/constants";
import { UnauthorizedError } from "@src/shared/errors";
import { ICrudRemoteFacade, IMiddleware, IRequest } from "@src/shared/interfaces";
import { NextFunction, Response } from "express";
import { injectNamed, provideSingletonNamed } from "../core/ioc/decorators";

@provideSingletonNamed(API_PROVIDER_TYPES.MIDDLEWARE, API_PROVIDER_NAMES.USER_SESSION)
export class UserSessionMiddleware implements IMiddleware<[void]> {
  constructor(
    @injectNamed(API_PROVIDER_TYPES.REMOTE_FACADE, MODEL_NAMES.USER)
    protected userRemoteFacade: ICrudRemoteFacade<UserModel>,
  ) {}

  public activate() {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const userId = req.header('User-Id');

        if (!userId) {
          throw new UnauthorizedError('You are not authorized');
        }

        const user = await this.userRemoteFacade.findById(userId);

        if (!user) {
          throw new UnauthorizedError('You are not authorized');
        }

        req.context.user = user;

        next();
      } catch (error) {
        next(error);
      }
    }
  }
}