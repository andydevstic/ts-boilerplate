import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class FindByIdSchemaTemplate implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.FIND_BY_ID,
      type: 'object',
      additionalProperties: false,
      properties: {
        select: {
          type: 'string',
          minLength: 1,
        },
      }
    }
  }
}
