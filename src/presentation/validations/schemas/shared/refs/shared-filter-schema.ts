import { provideSingleton } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_TYPES, FILTER_OPERATORS, VALIDATION_SCHEMAS } from "@src/shared/constants";
import { ValidationSchema } from "@src/shared/interfaces";

@provideSingleton(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
export class SharedFilterSchema implements ValidationSchema {
  public get schema() {
    return {
      $id: VALIDATION_SCHEMAS.FILTER,
      type: "object",
      required: ["code", "operator"],
      additionalProperties: false,
      properties: {
        code: {
          type: "string",
          minLength: 1,
          maxLength: 50,
        },
        operator: {
          type: "string",
          enum: Object.values(FILTER_OPERATORS),
        },
        value: {
          oneOf: [
            {
              type: "string",
              minLength: 1,
            },
            {
              type: "number",
            },
            {
              type: "array",
              uniqueItems: true,
              minItems: 1,
            },
          ],
        },
        values: {
          oneOf: [
            {
              type: "string",
              minLength: 1,
            },
            {
              type: "number",
            },
            {
              type: "array",
              uniqueItems: true,
              minItems: 1,
            },
          ],
        },
      },
    };
  }
}
