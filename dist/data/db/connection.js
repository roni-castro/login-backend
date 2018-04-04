"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DbConnection {
    static getConnectionOptions(autoSchemaSync = false) {
        const connectionOptions = {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: 3306,
            database: process.env.DB_SCHEMA,
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            "entities": [
                __dirname + "/entity/*.js"
            ],
            "subscribers": [
                __dirname + "/subscriber/*.js"
            ],
            "migrations": [
                __dirname + "migration/*.js"
            ],
            synchronize: true
        };
        return connectionOptions;
    }
}
exports.DbConnection = DbConnection;
