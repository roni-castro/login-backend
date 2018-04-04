import { BaseError } from './BaseError';

export class SimpleError {

  original: string;
  message: string;
  name: string;

  constructor(error: BaseError) {
    this.name = error.name;
    this.original = error.original;
    this.message = error.message;
  }

}
