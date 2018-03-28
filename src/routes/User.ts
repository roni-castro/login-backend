
import {Router, Request, Response, NextFunction} from 'express';
import connection from '../MysqlConnection';
import cryptoUtils from '../CryptoUtils';

export class UserRouter {
    router: Router

    // Initialize the UserRouter
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        this.router.get("/", this.getUsers);
        this.router.post("/", this.createNewUser);
    }

    //GET
    public getUsers = (req:Request, res:Response, next:NextFunction) => {
        connection.query("SELECT id, user_name, first_name, last_name FROM tb_user", function(err, users){
            if(err) {
                res.json({message: "Error getting users"});
                console.log(err);
            } else {
                res.json(users);
            }
        })
    }

    public createNewUser = (req:Request, res:Response, next:NextFunction) => {
        let userName: String     = req.body.user_name;
        let firstName: String    = req.body.first_name;
        let lastName: String     = req.body.last_name;
        let password: String     = req.body.password;

        if(! this.isValidToCreateNewUser(userName, firstName, lastName, password)){
            return res.status(400).json(this.setUpUnableToCreateUserErrors(userName, firstName, lastName, password));
        }
        // the body of the request is valid
        try{
            let encryptedPass = cryptoUtils.encrypt(password);
            connection.query(
                "INSERT INTO tb_user (user_name, first_name, last_name, pass_hash) VALUES (?, ?, ?, ?)", 
                [userName, firstName, lastName, encryptedPass], function(err, newUser){
                if(err) {
                    console.log(err);
                    return res.json({message: "Error creating user"});
                } else {
                    return res.status(200).json(newUser[0]);
                }
            })
        } catch(e){
            res.status(400).json({message: "User name or password are invalid"});
        }
    }

    private setUpUnableToCreateUserErrors = (userName: String, firstName:String, lastName:String, password: String) => {
        var errors = [];
        if(!userName){
            errors.push({message: "User name is required"});   
        }
        if(!firstName){
            errors.push({message: "First name is required"});   
        }
        if(!lastName){
            errors.push({message: "Last name is required"});   
        }
        if(!password){
            errors.push({message: "Password is required"});   
        }
        return errors;
    }

    private isValidToCreateNewUser = (userName: String, firstName:String, lastName:String, password: String) => {
        if(userName && firstName && lastName && password){
            return true;
        } else{
            return false;
        }
    }
}

// Create the UserRouter, and export its configured Express.Router
const userRouter = new UserRouter();
userRouter.init();
export default userRouter.router;

