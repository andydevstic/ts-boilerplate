import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class CreatePermissionSchema implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.PAGINATE_UNWATCHED_USERS,
      type: 'object',
      additionalProperties: false,
      required: ['limit'],
      properties: {
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 30,
        },
        offset: {
          type: 'integer',
          minimum: 0,
        },
        page: {
          type: 'integer',
          minimum: 0,
        },
      },
    }
  }
}