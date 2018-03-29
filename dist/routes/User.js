"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MysqlConnection_1 = require("../MysqlConnection");
const CryptoUtils_1 = require("../CryptoUtils");
class UserRouter {
    // Initialize the UserRouter
    constructor() {
        //GET
        this.getUsers = (req, res, next) => {
            MysqlConnection_1.default.query("SELECT id, user_name, first_name, last_name FROM tb_user", function (err, users) {
                if (err) {
                    res.json({ message: "Error getting users" });
                    console.log(err);
                }
                else {
                    res.json(users);
                }
            });
        };
        this.createNewUser = (req, res, next) => {
            let userName = req.body.user_name;
            let firstName = req.body.first_name;
            let lastName = req.body.last_name;
            let password = req.body.password;
            if (!this.isValidToCreateNewUser(userName, firstName, lastName, password)) {
                return res.status(400).json(this.setUpUnableToCreateUserErrors(userName, firstName, lastName, password));
            }
            // the body of the request is valid
            try {
                let encryptedPass = CryptoUtils_1.default.encrypt(password);
                MysqlConnection_1.default.query("INSERT INTO tb_user (user_name, first_name, last_name, pass_hash) VALUES (?, ?, ?, ?)", [userName, firstName, lastName, encryptedPass], function (err, newUser) {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(400).json({ message: "User already exists" });
                        }
                        else {
                            return res.status(400).json({ message: "Error creating user" });
                        }
                    }
                    else {
                        return res.status(201).json();
                    }
                });
            }
            catch (e) {
                res.status(400).json({ message: "User name or password are invalid" });
            }
        };
        this.setUpUnableToCreateUserErrors = (userName, firstName, lastName, password) => {
            var errors = [];
            if (!userName) {
                errors.push({ message: "User name is required" });
            }
            if (!firstName) {
                errors.push({ message: "First name is required" });
            }
            if (!lastName) {
                errors.push({ message: "Last name is required" });
            }
            if (!password) {
                errors.push({ message: "Password is required" });
            }
            return errors;
        };
        this.isValidToCreateNewUser = (userName, firstName, lastName, password) => {
            if (userName && firstName && lastName && password) {
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
        this.router.get("/", this.getUsers);
        this.router.post("/", this.createNewUser);
    }
}
exports.UserRouter = UserRouter;
// Create the UserRouter, and export its configured Express.Router
const userRouter = new UserRouter();
userRouter.init();
exports.default = userRouter.router;
