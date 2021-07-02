import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class SharedSortSchema implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.SORT,
      type: 'object',
      required: ['column', 'direction'],
      properties: {
        column: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        direction: {
          type: 'string',
          enum: ['DESC', 'ASC'],
        },
      },
    };
  }
}
