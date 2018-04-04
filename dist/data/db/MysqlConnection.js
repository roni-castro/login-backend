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
const connection_1 = require("./connection");
const typeorm_1 = require("typeorm");
class MysqlConnection {
    configureDB() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info('Will connect to DB');
            let connection = yield typeorm_1.createConnection(connection_1.DbConnection.getConnectionOptions()).catch(console.log).then(() => null);
            console.info('Connected to ORM database!');
            return connection;
        });
    }
}
exports.MysqlConnection = MysqlConnection;
