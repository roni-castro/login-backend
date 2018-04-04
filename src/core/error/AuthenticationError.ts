import { BaseError } from './baseError';
import { ErrorType } from './ErrorType';

export class AuthenticationError extends BaseError {

  constructor(message?: string) {
    super(ErrorType.AuthenticationError, message);
  }

}
