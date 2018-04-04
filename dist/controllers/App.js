"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const routing_controllers_1 = require("routing-controllers");
class App {
    createServer() {
        let app = express(); // your created express server
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        routing_controllers_1.useExpressServer(app, {
            routePrefix: "/api",
            middlewares: [__dirname + "/middlewares/**/*.js"],
            controllers: [__dirname + "/controllers/**/*.js"]
        });
        return app;
    }
}
const app = new App();
exports.default = app.createServer();
