"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const AuthenticationError_1 = require("../error/AuthenticationError");
const ErrorType_1 = require("../error/ErrorType");
const ErrorResponse_1 = require("../error/ErrorResponse");
let ErrorService = class ErrorService {
    buildErrorResponse(error) {
        let errors = [];
        let errorCode;
        switch (error.name) {
            case ErrorType_1.ErrorType[ErrorType_1.ErrorType.AuthenticationError]:
                if (error instanceof AuthenticationError_1.AuthenticationError) {
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
        return new ErrorResponse_1.ErrorResponse(errorCode, errors);
    }
};
ErrorService = __decorate([
    typedi_1.Service()
], ErrorService);
exports.ErrorService = ErrorService;
