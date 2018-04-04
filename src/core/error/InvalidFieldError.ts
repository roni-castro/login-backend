import { BaseError } from './baseError';
import { ErrorType } from './ErrorType';

export class InvalidFieldError extends BaseError {

  constructor(message?: string) {
    super(ErrorType.AuthenticationError, message);
  }

}
