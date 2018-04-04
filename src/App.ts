import * as path from 'path'; //provides utilities for working with file and directory paths
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import LoginRouter from './routes/Login';
import UserRouter from './routes/User';
import cryptoUtils from './CryptoUtils';
import "reflect-metadata";

class App{

    //holds a reference to Express instance
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Express middleware
    private middleware(): void{
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    // Link up API endpoints and route handlers
    private routes(): void{
        let router = express.Router();
        router.get("/", (req, res, next) => {
            res.json({
                message: 'Home'
            });
        });
        this.express.use("/api", router);
        this.express.use("/api/session", LoginRouter);
        this.express.use("/api/user", UserRouter);
    }
}

const app = new App()
export default app.express;
