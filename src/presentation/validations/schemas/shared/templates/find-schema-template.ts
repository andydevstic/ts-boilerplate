import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class FindSchemaTemplate implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.FIND,
      type: 'object',
      additionalProperties: false,
      properties: {
        select: {
          type: 'string',
          minLength: 1,
        },
        search: {
          type: 'string',
          minLength: 3,
        },
        includes: {
          type: 'array',
          uniqueItems: true,
          minLength: 1,
          items: {
            $ref: VALIDATION_SCHEMAS.INCLUDE,
          }
        },
        filters: {
          type: 'array',
          minLength: 1,
          uniqueItems: true,
          items: {
            $ref: VALIDATION_SCHEMAS.FILTER,
          },
        },
        sort: {
          $ref: VALIDATION_SCHEMAS.SORT,
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 100,
        },
        page: {
          type: 'integer',
          minimum: 1,
        },
        offset: {
          type: 'integer',
          minimum: 0,
        },
      }
    }
  }
}
