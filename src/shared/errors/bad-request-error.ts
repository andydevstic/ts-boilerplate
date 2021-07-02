import { CustomErrors } from '../constants';
import { BaseError } from './base-error';

export class BadRequestError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, CustomErrors.BAD_REQUEST, 400, details);
  }
}
