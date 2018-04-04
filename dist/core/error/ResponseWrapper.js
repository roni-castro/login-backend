"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorResponse_1 = require("./ErrorResponse");
const SimpleError_1 = require("./SimpleError");
class ResponseWrap {
    constructor(myData) {
        if (myData instanceof ErrorResponse_1.ErrorResponse) {
            this.data = null;
            this.errors = myData.errors.map(error => new SimpleError_1.SimpleError(error));
        }
        else {
            this.data = myData;
        }
    }
}
exports.ResponseWrap = ResponseWrap;
function ResponseWrapper() {
    return (target, method, methodDescriptor) => {
        const originalMethod = methodDescriptor.value;
        return {
            value(...args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = yield originalMethod.apply(this, args);
                    return new ResponseWrap(data);
                });
            },
        };
    };
}
exports.ResponseWrapper = ResponseWrapper;
