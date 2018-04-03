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
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const Login_1 = require("./routes/Login");
const User_1 = require("./routes/User");
require("reflect-metadata");
const connection_1 = require("./connection");
const typeorm_1 = require("typeorm");
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
        this.express.use("/api/session", Login_1.default);
        this.express.use("/api/user", User_1.default);
    }
    configureDB() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info('Will connect to DB');
            yield typeorm_1.createConnection(connection_1.DbConnection.getConnectionOptions());
            console.info('Connected to database!');
        });
    }
}
const app = new App();
app.configureDB();
exports.default = app.express;
