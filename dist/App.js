"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const Login_1 = require("./routes/Login");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Express middleware
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Link up API endpoints and route handlers
    routes() {
        let router = express.Router();
        router.get("/", (req, res, next) => {
            res.json({
                message: 'Home'
            });
        });
        this.express.use("/api", router);
        this.express.use("/api/login", Login_1.default);
    }
}
exports.default = new App().express;
