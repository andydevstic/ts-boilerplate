import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class PaginateUsersSchema implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.PAGINATE_USERS,
      type: 'object',
      additionalProperties: false,
      required: ['limit', 'page'],
      properties: {
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 30,
        },
        page: {
          type: 'integer',
          minimum: 1,
        },
        select: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        filters: {
          $ref: VALIDATION_SCHEMAS.FILTER,
        },
        sort: {
          $ref: VALIDATION_SCHEMAS.SORT,
        },
      },
    };
  }
}
