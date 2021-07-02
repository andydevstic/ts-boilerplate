import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, USER_ACTION_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class RecordUserActionSchema implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.RECORD_USER_ACTION,
      type: 'object',
      additionalProperties: false,
      required: ['targetUserIndex', 'actionId'],
      properties: {
        targetUserIndex: {
          type: 'integer',
          minimum: 1,
        },
        actionId: {
          type: 'integer',
          enum: Object.values(USER_ACTION_TYPES),
        },
      },
    }
  }
}