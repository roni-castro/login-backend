import {Router, Request, Response, NextFunction} from 'express';
import connection from '../MysqlConnection';
import cryptoUtils from '../CryptoUtils';

class LoginRouter {
    router: Router

    // Initialize the LoginRouter
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        this.router.post("/", this.login);
    }

    // POST
    public login = (req:Request, res:Response, next:NextFunction) => {
        let userName:String = req.body.user_name;
        let password:String = req.body.password;

        if(! this.isValidLoginCredentials(userName, password)){
            return res.status(400).json(this.setUpUnableToLoginErrors(userName, password));
        }
        // the body of the request is valid
        connection.query(
            "SELECT id, pass_hash FROM tb_user WHERE user_name = ?", 
            [userName], function(err, user){
            if(err) {
                res.json({message: "Error quering user"});
                console.log(err);
            } else {
                if(user.length == 0){ // User not found
                    res.status(400).json({message: "User not found"});
                } else {
                    var userData = user[0];
                    let pass = cryptoUtils.decrypt(userData.pass_hash);
                    if(pass == password){
                        res.status(200).json({
                            "id": userData.id,
                            "user_name": userData.user_name
                        });
                    } else{
                        res.status(400).json({message: "Password is not valid"});
                    }
                }
            }
        })
    }

    private setUpUnableToLoginErrors = (userName: String, password: String) => {
        var errors = [];
        if(!userName){
            errors.push({message: "User name is required"});   
        }
        if(!password){
            errors.push({message: "Password is required"});   
        }
        return errors;
    }

    private isValidLoginCredentials = (userName: String, password: String) => {
        // return userName && password;
        if(userName && password){
            return true;
        } else{
            return false;
        }
    }

    private isValidToCreateNewUser = (userName: String, firstName:String, lastName:String, password: String) => {
        if(userName && firstName && lastName && password){
            return true;
        } else{
            return false;
        }
    }
}

// Create the LoginRouter, and export its configured Express.Router
const loginRouter = new LoginRouter();
loginRouter.init();
export default loginRouter.router;

