import  "reflect-metadata";
import * as express from 'express';
// import * as bodyParser from 'body-parser';
import {useExpressServer, useContainer} from "routing-controllers";
import {useContainer as useContainerTypeOrm} from 'typeorm'
import {Container} from "typedi";
import { MysqlConnection} from './data/MysqlConnection';

useContainer(Container);
useContainerTypeOrm(Container);

class App{
    
    public async createServer () {
        let app = express(); // your created express server
        useExpressServer(app, { // register created express server in routing-controllers
            routePrefix: "/api",
            middlewares: [__dirname + "/middlewares/**/*.js"],
            controllers: [__dirname + "/controllers/**/*.js"]
        });
        let connection = await this.createDBConnection();
        return app;
    }

    public createDBConnection(){
        return new MysqlConnection().configureDB();
    }
}

const app = new App()
export default app.createServer();
