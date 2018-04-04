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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoUtils_1 = require("../CryptoUtils");
const UserRepository_1 = require("../data/UserRepository");
const AuthenticationError_1 = require("../core/error/AuthenticationError");
const InvalidFieldError_1 = require("../core/error/InvalidFieldError");
const LoginUserResponse_1 = require("../domain/LoginUserResponse");
const typedi_1 = require("typedi");
let LoginUseCase = class LoginUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.isValidFields = (userName, password) => {
            // return userName && password;
            if (userName && password) {
                return true;
            }
            else {
                return false;
            }
        };
        console.log('usecase');
    }
    exec(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let userName = request.userName;
            let password = request.password;
            if (!this.isValidFields(userName, password)) {
                throw new InvalidFieldError_1.InvalidFieldError('User name and password field are required');
            }
            let user = yield this.userRepository.findUserByUserName(userName);
            if (!user) {
                throw new AuthenticationError_1.AuthenticationError('User not found.');
            }
            let encryptedTypedPassword = CryptoUtils_1.default.encrypt(password);
            if (encryptedTypedPassword != user.passHash) {
                throw new AuthenticationError_1.AuthenticationError('Invalid user name or password');
            }
            let token = CryptoUtils_1.default.createTokenToUser(user.id, user.userName);
            return new LoginUserResponse_1.LoginUserResponse(user.id, user.userName, user.firstName, user.lastName, token);
        });
    }
};
LoginUseCase = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], LoginUseCase);
exports.LoginUseCase = LoginUseCase;
