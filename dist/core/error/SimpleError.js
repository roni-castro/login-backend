"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleError {
    constructor(error) {
        this.name = error.name;
        this.original = error.original;
        this.message = error.message;
    }
}
exports.SimpleError = SimpleError;
