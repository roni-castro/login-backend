"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const ErrorService_1 = require("../core/error/ErrorService");
const ResponseWrapper_1 = require("../core/error/ResponseWrapper");
const typedi_1 = require("typedi");
let GlobalErrorMiddleware = class GlobalErrorMiddleware {
    constructor(errorService) {
        this.errorService = errorService;
    }
    error(error, request, response, next) {
        console.error('Global Error Handled: ', error);
        // console.error('Message: ', error.message);
        if (!error) {
            next();
            return;
        }
        const errorResponse = this.errorService.buildErrorResponse(error);
        response.status(errorResponse.code).send(new ResponseWrapper_1.ResponseWrap(errorResponse));
        next();
    }
};
GlobalErrorMiddleware = __decorate([
    typedi_1.Service(),
    routing_controllers_1.Middleware({ type: 'after' }),
    __metadata("design:paramtypes", [ErrorService_1.ErrorService])
], GlobalErrorMiddleware);
exports.GlobalErrorMiddleware = GlobalErrorMiddleware;
