import * as Bcrypt from 'bcrypt';

import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from "@src/shared/constants";
import { IHashService } from "@src/shared/interfaces";
import { provideSingletonNamed } from "../core/ioc/decorators";

@provideSingletonNamed(API_PROVIDER_TYPES.SERVICE, API_PROVIDER_NAMES.HASH)
export class HashService implements IHashService {
  public async encrypt(payload: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Bcrypt.genSalt((error, salt) => {
        if (error) {
          return reject(error);
        }

        Bcrypt.hash(payload, salt, (hashError, encrypted) => {
          if (hashError) {
            return reject(hashError);
          }

          resolve(encrypted);
        });
      });
    });
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(data, encrypted, (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });
  }
}
