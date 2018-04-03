import * as path from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';

declare var __dirname;

export class DbConnection {

  public static getConnectionOptions( autoSchemaSync: boolean = false): ConnectionOptions {

    const connectionOptions: ConnectionOptions = {
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
