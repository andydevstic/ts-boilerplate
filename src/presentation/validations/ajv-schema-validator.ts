import Ajv from 'ajv';
import { multiInject } from 'inversify';

import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from '@src/shared/constants';
import { Formater, ValidationSchema } from '@src/shared/interfaces';
import { injectNamed, provideSingleton } from '../core/ioc/decorators';
import { InternalServerError } from '@src/shared/errors';

@provideSingleton(API_PROVIDER_TYPES.SCHEMA_VALIDATOR)
export class AjvSchemaValidator {
  private _validator: Ajv;

  constructor(
    @multiInject(API_PROVIDER_TYPES.VALIDATION_SCHEMA)
    appSchemas: ValidationSchema[],

    @injectNamed(API_PROVIDER_TYPES.FORMATER, API_PROVIDER_NAMES.AJV_ERROR)
    protected ajvErrorFormater: Formater,
  ) {
    const ajvInstance = new Ajv({ allErrors: true });

    ajvInstance.addSchema(appSchemas.map(appSchema => appSchema.schema));
    ajvInstance.compile(true);

    this._validator = ajvInstance;
  }

  public validate(schemaName: string, payload: any) {
    const validator = this._validator.getSchema(schemaName);

    if (!validator) {
      throw new InternalServerError(`Schema name ${schemaName} not supported.`);
    }

    const isValid = validator(payload);
    const errors = validator.errors || [];
    const formatedErrors = this.ajvErrorFormater.format(errors);

    return {
      valid: isValid as boolean,
      errors: formatedErrors,
    };
  }
}
