"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseError_1 = require("./baseError");
const ErrorType_1 = require("./ErrorType");
class InvalidFieldError extends baseError_1.BaseError {
    constructor(message) {
        super(ErrorType_1.ErrorType.AuthenticationError, message);
    }
}
exports.InvalidFieldError = InvalidFieldError;
