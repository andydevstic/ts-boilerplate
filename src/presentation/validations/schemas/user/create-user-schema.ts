import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, USER_STATUS, USER_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class CreateUserSchema implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.CREATE_USER,
      type: 'object',
      additionalProperties: false,
      required: ['email', 'password', 'dateOfBirth', 'userType', 'status'],
      properties: {
        email: {
          type: 'string',
          minLength: 3,
          maxLength: 255,
        },
        fullName: {
          type: 'string',
          minLength: 3,
          maxLength: 50
        },
        dateOfBirth: {
          type: 'string',
          maxLength: 100,
        },
        password: {
          type: 'string',
          minLength: 6,
          maxLength: 255,
        },
        userType: {
          type: 'number',
          enum: Object.values(USER_TYPES),
        },
        status: {
          type: 'number',
          enum: Object.values(USER_STATUS),
        },
        meta: {
          type: 'object',
        }
      },
    };
  }
}
