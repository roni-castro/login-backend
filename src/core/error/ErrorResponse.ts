import { BaseError } from '../error/BaseError';

export class ErrorResponse {
  constructor(
    readonly code: number,
    readonly errors: BaseError[],
  ) { }
}
