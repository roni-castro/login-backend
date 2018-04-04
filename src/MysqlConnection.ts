//var mysql  = require ('mysql');
require('dotenv').config()
import { DbConnection } from './connection';
import { createConnection, Connection} from 'typeorm';
import {UserModel} from "./entity/UserModel";

class MysqlConnection{

  public async configureDB(){
    console.info('Will connect to DB');
    let connection = await createConnection(DbConnection.getConnectionOptions());
    console.info('Connected to ORM database!');
    return connection;
  }
}

let connection:Promise<Connection> = new MysqlConnection().configureDB();

export default connection;

