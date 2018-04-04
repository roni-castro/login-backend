"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const port = (process.env.PORT || 3000);
App_1.default.then(app => app.listen(port, function () {
    console.log("Server is Listening");
})).catch(err => { throw err; });
