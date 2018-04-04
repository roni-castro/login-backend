"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class DbConnection {
    static getConnectionOptions(autoSchemaSync = false) {
        console.log(path.join(__dirname, '..') + '/entity/*.{ts,js}');
        const connectionOptions = {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: 3306,
            database: process.env.DB_SCHEMA,
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            "entities": [
                path.join(__dirname, '..') + '/entity/*.{ts,js}'
            ],
            "subscribers": [
                path.join(__dirname, '..') + '/subscriber/*.{ts,js}'
            ],
            "migrations": [
                path.join(__dirname, '..') + '/migration/*.{ts,js}'
            ],
            synchronize: true
        };
        return connectionOptions;
    }
}
exports.DbConnection = DbConnection;
