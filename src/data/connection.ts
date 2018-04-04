import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

declare var __dirname;

export class DbConnection {

  public static getConnectionOptions( autoSchemaSync: boolean = false): ConnectionOptions {
    console.log(path.join(__dirname, '..') + '/entity/*.{ts,js}')
    const connectionOptions: ConnectionOptions = {
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
