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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginUserRequest_1 = require("../domain/LoginUserRequest");
const LoginUseCase_1 = require("../domain/LoginUseCase");
const routing_controllers_1 = require("routing-controllers");
let LoginController = class LoginController {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    login(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCaseRequest = new LoginUserRequest_1.LoginUserRequest(userName, password);
            const useCaseResponse = yield this.loginUseCase.exec(useCaseRequest);
            return useCaseResponse;
        });
    }
};
__decorate([
    routing_controllers_1.Post("/session"),
    __param(0, routing_controllers_1.BodyParam("user_name")),
    __param(1, routing_controllers_1.BodyParam("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [LoginUseCase_1.LoginUseCase])
], LoginController);
exports.LoginController = LoginController;
