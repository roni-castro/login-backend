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
require("reflect-metadata");
const express = require("express");
// import * as bodyParser from 'body-parser';
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const MysqlConnection_1 = require("./MysqlConnection");
routing_controllers_1.useContainer(typedi_1.Container);
typeorm_1.useContainer(typedi_1.Container);
class App {
    createServer() {
        return __awaiter(this, void 0, void 0, function* () {
            let app = express(); // your created express server
            routing_controllers_1.useExpressServer(app, {
                routePrefix: "/api",
                middlewares: [__dirname + "/middlewares/**/*.js"],
                controllers: [__dirname + "/controllers/**/*.js"]
            });
            let connection = yield this.createDBConnection();
            return app;
        });
    }
    createDBConnection() {
        return new MysqlConnection_1.MysqlConnection().configureDB();
    }
}
const app = new App();
exports.default = app.createServer();
