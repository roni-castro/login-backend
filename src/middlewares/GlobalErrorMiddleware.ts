import { ExpressErrorMiddlewareInterface, ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

import { ErrorService } from '../core/error/ErrorService';
import { ResponseWrap } from '../core/error/ResponseWrapper';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class GlobalErrorMiddleware implements ExpressErrorMiddlewareInterface {

  constructor(
    private readonly errorService: ErrorService,
  ) { }

  error(error: any, request: any, response: any, next?: () => void): void {

     console.error('Global Error Handled: ', error);
    // console.error('Message: ', error.message);

    if (!error) {
      next();
      return;
    }

    const errorResponse = this.errorService.buildErrorResponse(error);
    response.status(errorResponse.code).send(new ResponseWrap(errorResponse));

    next();

  }
}
