import { BaseError } from './base-error';
import { CustomErrors } from '../constants';

export class ForbiddenError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, CustomErrors.FORBIDDEN, 403, details);
  }
}