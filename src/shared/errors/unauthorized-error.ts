import { BaseError } from './base-error';
import { CustomErrors } from '../constants';

export class UnauthorizedError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, CustomErrors.UNAUTHORIZED, 401, details);
  }
}
