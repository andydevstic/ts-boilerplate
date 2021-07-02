import { ErrorObject } from 'ajv';

import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from "@src/shared/constants";
import { injectNamed, provideSingletonNamed } from '@src/presentation/core/ioc/decorators';
import { AppErrorDetail, Formater, ILogger } from "@src/shared/interfaces";

@provideSingletonNamed(API_PROVIDER_TYPES.FORMATER, API_PROVIDER_NAMES.AJV_ERROR)
export class AjvErrorFormater implements Formater {

  constructor(
    @injectNamed(API_PROVIDER_TYPES.LOGGER, API_PROVIDER_NAMES.LOG4JS)
    protected logger: ILogger,
  ) {}

  public format(ajvErrors: ErrorObject[]): AppErrorDetail[] {
    return ajvErrors.map(ajvError => this.formatEachError(ajvError));
  }

  protected formatEachError(ajvError: ErrorObject): AppErrorDetail {
    this.logger.debug(JSON.stringify(ajvError));

    const { keyword, params, message, instancePath } = ajvError;
    const { missingProperty } = params;
    const incorrectFieldName = instancePath?.split('/').pop();

    switch (keyword) {
      case 'required':
        return {
          field: incorrectFieldName || 'Missing field',
          message: message || `Missing required property: ${missingProperty}`,
        }
      case 'additionalProperties':
        const additionalProperty = params.additionalProperty;
        return {
          field: incorrectFieldName || 'Excessive field provided',
          message: `Property not allowed: ${additionalProperty}`,
        }
      default:
        return {
          field: incorrectFieldName || instancePath || 'Property error',
          message: message || `Missing required property: ${missingProperty}`,
        }
    }
  }
}