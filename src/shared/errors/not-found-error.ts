import { BaseError } from './base-error';
import { CustomErrors } from '../constants';

export class NotFoundError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, CustomErrors.NOT_FOUND, 404, details);
  }
}
