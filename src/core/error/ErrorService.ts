import { Container, Service } from 'typedi';
import { BaseError } from '../error/BaseError';
import { AuthenticationError } from '../error/AuthenticationError';
import { ErrorType } from '../error/ErrorType';
import { ErrorResponse } from '../error/ErrorResponse';
import { ValidationError } from 'class-validator';
import { BadRequestError } from 'routing-controllers';

@Service()
export class ErrorService {

  buildErrorResponse<T extends BaseError>(error: T): ErrorResponse {
    let errors: BaseError[] = [];
    let errorCode: number;

    switch (error.name) {
      case ErrorType[ErrorType.AuthenticationError]:
        if (error instanceof AuthenticationError) {
          errorCode = 400;
          error.original = error.message;
          error.message = error.message;
        }
        break;

      default:
        errorCode = 500;
        errors.push(error);
        break;
    }

    return new ErrorResponse(errorCode, errors);
  }
}
