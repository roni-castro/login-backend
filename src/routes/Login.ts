import {Router, Request, Response, NextFunction} from 'express';
import connection from '../MysqlConnection';

export class LoginRouter {
    router: Router

    // Initialize the LoginRouter
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        this.router.get("/", this.getUsers);
        this.router.post("/", this.login);
    }

    public getUsers(req:Request, res:Response, next:NextFunction){
        connection.query("SELECT id, user_name, first_name, last_name FROM tb_user", function(err, users){
            if(err) {
                res.json({message: "Error getting users"});
                console.log(err);
            } else {
                res.json(users);
            }
        })
    }

    public login(req:Request, res:Response, next:NextFunction){
        let user
        
        connection.query("SELECT id, first_name, last_name FROM tb_user", function(err, users){
            if(err) {
                res.json({message: "Error getting users"});
                console.log(err);
            } else {
                res.json(users);
            }
        })
    }
}

// Create the LoginRouter, and export its configured Express.Router
const loginRouter = new LoginRouter();
loginRouter.init();
export default loginRouter.router;

