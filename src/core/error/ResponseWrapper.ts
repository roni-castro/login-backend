import { BaseError } from './BaseError';
import { ErrorResponse } from './ErrorResponse';
import { ErrorType } from './ErrorType';
import { SimpleError } from './SimpleError';

export class ResponseWrap<T> {

  private readonly data: T;
  private errors: SimpleError[];

  constructor(myData: T) {

    if (myData instanceof ErrorResponse) {
      this.data = null;
      this.errors = myData.errors.map(error => new SimpleError(error));
    } else {
      this.data = myData;
    }
  }
}

export function ResponseWrapper(): any {
  return (target: any, method: string, methodDescriptor: any) => {
    const originalMethod = methodDescriptor.value;

    return {
      async value(...args: any[]) {
        const data = await originalMethod.apply(this, args);
        return new ResponseWrap(data);
      },
    };
  };
}
