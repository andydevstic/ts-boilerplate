import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class GetUserTypesSchema implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.GET_USER_TYPES,
      type: 'object',
      additionalProperties: false,
      properties: {
        select: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
      },
    };
  }
}
