"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MysqlConnection_1 = require("../MysqlConnection");
class LoginRouter {
    // Initialize the LoginRouter
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", this.getUsers);
        this.router.post("/", this.login);
    }
    getUsers(req, res, next) {
        MysqlConnection_1.default.query("SELECT id, user_name, first_name, last_name FROM tb_user", function (err, users) {
            if (err) {
                res.json({ message: "Error getting users" });
                console.log(err);
            }
            else {
                res.json(users);
            }
        });
    }
    login(req, res, next) {
        let user;
        MysqlConnection_1.default.query("SELECT id, first_name, last_name FROM tb_user", function (err, users) {
            if (err) {
                res.json({ message: "Error getting users" });
                console.log(err);
            }
            else {
                res.json(users);
            }
        });
    }
}
exports.LoginRouter = LoginRouter;
// Create the LoginRouter, and export its configured Express.Router
const loginRouter = new LoginRouter();
loginRouter.init();
exports.default = loginRouter.router;
