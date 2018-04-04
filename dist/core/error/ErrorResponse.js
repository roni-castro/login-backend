"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse {
    constructor(code, errors) {
        this.code = code;
        this.errors = errors;
    }
}
exports.ErrorResponse = ErrorResponse;
