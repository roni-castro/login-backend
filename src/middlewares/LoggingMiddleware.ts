import {Middleware, ExpressMiddlewareInterface} from "routing-controllers";
 
@Middleware({ type: "before" })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
 
    use(request: any, response: any, next?: () => any): void {

        next();
    }
 
}