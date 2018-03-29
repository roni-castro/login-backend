"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MysqlConnection_1 = require("../MysqlConnection");
const CryptoUtils_1 = require("../CryptoUtils");
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
            MysqlConnection_1.default.query("SELECT id, pass_hash FROM tb_user WHERE user_name = ?", [userName], function (err, user) {
                if (err) {
                    res.json({ message: "Error quering user" });
                    console.log(err);
                }
                else {
                    if (user.length == 0) { // User not found
                        res.status(400).json({ message: "User not found" });
                    }
                    else {
                        var userData = user[0];
                        let pass = CryptoUtils_1.default.decrypt(userData.pass_hash);
                        if (pass == password) {
                            res.status(200).json({
                                "id": userData.id,
                                "user_name": userData.user_name
                            });
                        }
                        else {
                            res.status(400).json({ message: "Password is not valid" });
                        }
                    }
                }
            });
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
