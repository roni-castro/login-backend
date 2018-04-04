import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

declare var __dirname;

export class DbConnection {

  public static getConnectionOptions( autoSchemaSync: boolean = false): ConnectionOptions {
console.log(__dirname + "/entity/*.js")
    const connectionOptions: ConnectionOptions = {
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
