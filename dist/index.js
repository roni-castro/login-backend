"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const debug = require("debug");
const App_1 = require("./App");
const port = (process.env.PORT || 3000);
//App.set('port', port);
const server = http.createServer(App_1.default);
server.listen(port);
server.on('error', onErrorListener);
server.on('listening', onListening);
function onErrorListener(error) {
    console.log(error.code, console.log(error.message));
    throw error;
}
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
