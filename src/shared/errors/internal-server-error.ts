import { BaseError } from './base-error';
import { CustomErrors } from '../constants';

export class InternalServerError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, CustomErrors.INTERNAL, 500, details);
  }
}
