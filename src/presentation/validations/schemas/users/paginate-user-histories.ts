import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, USER_ACTION_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class PaginateUserHistoriesSchema implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.PAGINATE_USER_HISTORY,
      type: 'object',
      additionalProperties: false,
      required: ['limit', 'actionId'],
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
        actionId: {
          type: 'integer',
          enum: Object.values(USER_ACTION_TYPES)
        }
      },
    }
  }
}