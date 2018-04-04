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
const express_1 = require("express");
const CryptoUtils_1 = require("../CryptoUtils");
const UserRepository_1 = require("../data/UserRepository");
class LoginRouter {
    // Initialize the LoginRouter
    constructor() {
        // POST
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let userName = req.body.user_name;
            let password = req.body.password;
            if (!this.isValidLoginCredentials(userName, password)) {
                return res.status(400).json(this.setUpUnableToLoginErrors(userName, password));
            }
            let user = yield new UserRepository_1.UserRepository().findUserByUserName(userName)
                .then(function (user) {
                let encryptedTypedPassword = CryptoUtils_1.default.encrypt(password);
                if (encryptedTypedPassword == user.passHash) {
                    let token = CryptoUtils_1.default.createTokenToUser(user);
                    res.status(200).json({
                        id: user.id,
                        user_name: user.userName,
                        first_name: user.firstName,
                        last_name: user.lastName,
                        token: token
                    });
                }
                else {
                    res.status(400).json({ message: "Password is not valid" });
                }
            })
                .catch(function (error) {
                console.log(error);
                res.status(400).json({ message: "User not found" });
            });
        });
        this.setUpUnableToLoginErrors = (userName, password) => {
            var errors = [];
            if (!userName) {
                errors.push({ message: "User name is required" });
            }
            if (!password) {
                errors.push({ message: "Password is required" });
            }
            return errors;
        };
        this.isValidLoginCredentials = (userName, password) => {
            // return userName && password;
            if (userName && password) {
                return true;
            }
            else {
                return false;
            }
        };
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.post("/", this.login);
    }
}
// Create the LoginRouter, and export its configured Express.Router
const loginRouter = new LoginRouter();
loginRouter.init();
exports.default = loginRouter.router;
