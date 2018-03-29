"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MysqlConnection_1 = require("../MysqlConnection");
const CryptoUtils_1 = require("../CryptoUtils");
const UserModel_1 = require("../model/UserModel");
class LoginRouter {
    // Initialize the LoginRouter
    constructor() {
        // POST
        this.login = (req, res, next) => {
            let userName = req.body.user_name;
            let password = req.body.password;
            if (!this.isValidLoginCredentials(userName, password)) {
                return res.status(400).json(this.setUpUnableToLoginErrors(userName, password));
            }
            // the body of the request is valid
            MysqlConnection_1.default.query("SELECT * FROM tb_user WHERE user_name = ?", [userName], function (err, results) {
                if (err) {
                    res.json({ message: "Error quering user" });
                    console.log(err);
                }
                else {
                    if (results.length == 0) { // User not found
                        res.status(400).json({ message: "User not found" });
                    }
                    else {
                        var userFromDB = results[0];
                        let encryptedTypedPassword = CryptoUtils_1.default.encrypt(password);
                        if (encryptedTypedPassword == userFromDB.pass_hash) {
                            let user = new UserModel_1.UserModel(userFromDB.id, userFromDB.user_name, userFromDB.first_name, userFromDB.last_name);
                            let token = CryptoUtils_1.default.createTokenWith({
                                id: user.id,
                                user_name: user.userName
                            });
                            res.status(200).json({
                                id: user.id,
                                user_name: user.userName,
                                first_name: user.firstname,
                                last_name: user.lastName,
                                token: token
                            });
                        }
                        else {
                            res.status(400).json({ message: "Password is not valid" });
                        }
                    }
                }
            });
        };
        this.generateLoggedInUserToBeReturned = (user, token) => {
            return {
                id: user.id,
                user_name: user.userName,
                first_name: user.firstname,
                last_name: user.lastName,
                token: token
            };
        };
        this.generateLoggedInUserToBeUsedOnToken = (user) => {
            return {
                id: user.id,
                user_name: user.userName,
                first_name: user.firstname,
                last_name: user.lastName
            };
        };
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
