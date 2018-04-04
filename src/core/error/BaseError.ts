import { ErrorType } from './ErrorType';

export class BaseError extends Error {

  original: string;

  constructor(type: ErrorType, message?: string) {
    super(message);

    this.name = ErrorType[type];
    this.stack = (new Error() as any).stack;
    this.original = message;
    this.message = message;
  }
}
