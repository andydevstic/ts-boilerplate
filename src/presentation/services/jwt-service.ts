import { inject } from 'inversify';
import * as JWT from 'jsonwebtoken';

import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from '@src/shared/constants';
import { Configuration, IJwtService } from '@src/shared/interfaces';
import { provideSingletonNamed } from '../core/ioc/decorators';

@provideSingletonNamed(API_PROVIDER_TYPES.SERVICE, API_PROVIDER_NAMES.JWT)
export class JWTService implements IJwtService {
  protected _secret: string;

  constructor(
    @inject(API_PROVIDER_TYPES.CONFIG)
    protected config: Configuration,
  ) {
    const jwtSecret = this.config.get('jwt.secret');
    if (!jwtSecret) {
      throw new Error('Missing jwt secret configuration');
    }

    this._secret = jwtSecret;
  }

  public async sign(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
      JWT.sign(
        payload,
        this._secret,
        {
          expiresIn: this.config.get('jwt.ttl'),
        },
        (error: Error, data: string) => {
          if (error) {
            return reject(error);
          }

          resolve(data);
        });
    });
  }

  public async verify(jwt: any): Promise<any> {
    return new Promise((resolve, reject) => {
      JWT.verify(jwt, this._secret, (error: any, data: any) => {
        if (error) {
          return reject(error);
        }

        resolve(data);
      });
    });
  }
}
