//var mysql  = require ('mysql');
//require('dotenv').config()
import { DbConnection } from './connection';
import { createConnection, Connection} from 'typeorm';
import {UserModel} from "./entity/UserModel";

export class MysqlConnection{

  public async configureDB(): Promise<Connection>{
    console.info('Will connect to DB');
    let connection = await createConnection(DbConnection.getConnectionOptions()).catch(console.log).then(() => null);
    console.info('Connected to ORM database!');
    return connection;
  }
}

