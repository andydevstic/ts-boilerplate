import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class LoginSchema implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.LOGIN,
      type: 'object',
      additionalProperties: false,
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          minLength: 3,
          maxLength: 255,
        },
        password: {
          type: 'string',
          minLength: 6,
          maxLength: 255,
        },
      },
    };
  }
}
