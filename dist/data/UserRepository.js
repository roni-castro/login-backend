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
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const UserModel_1 = require("../entity/UserModel");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const CryptoUtils_1 = require("../CryptoUtils");
let UserRepository = class UserRepository {
    constructor(dbOrmRepository) {
        this.dbOrmRepository = dbOrmRepository;
    }
    findUserByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbOrmRepository.findOne({ userName });
        });
    }
    createNewUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new UserModel_1.UserModel();
            user.userName = 'roni';
            user.firstName = 'roni';
            user.lastName = 'castro';
            let encryptedTypedPassword = CryptoUtils_1.default.encrypt('12345');
            user.passHash = encryptedTypedPassword;
            return yield this.dbOrmRepository.save(user);
        });
    }
};
UserRepository = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.OrmRepository(UserModel_1.UserModel)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserRepository);
exports.UserRepository = UserRepository;
