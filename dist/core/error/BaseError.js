"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorType_1 = require("./ErrorType");
class BaseError extends Error {
    constructor(type, message) {
        super(message);
        this.name = ErrorType_1.ErrorType[type];
        this.stack = new Error().stack;
        this.original = message;
        this.message = message;
    }
}
exports.BaseError = BaseError;
