"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class DbConnection {
    static getConnectionOptions(autoSchemaSync = false) {
        const connectionOptions = {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: 3306,
            database: process.env.DB_SCHEMA,
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            entities: [
                path.join(__dirname, '..') + "src/entity/**/*.ts",
            ],
            migrations: [
                path.join(__dirname, '.') + "src/migration/**/*.ts",
            ],
            synchronize: true
        };
        return connectionOptions;
    }
}
exports.DbConnection = DbConnection;
