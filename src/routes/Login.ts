import {Router, Request, Response, NextFunction} from 'express';
import connection from '../MysqlConnection';
import cryptoUtils from '../CryptoUtils';
import {UserModel} from '../entity/UserModel'
import userDbController from '../controllers/UserDbController'

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
    public login = async (req:Request, res:Response, next:NextFunction) => {
        let userName:String = req.body.user_name;
        let password:String = req.body.password;

        if(! this.isValidLoginCredentials(userName, password)){
            return res.status(400).json(this.setUpUnableToLoginErrors(userName, password));
        }
        // the body of the request is valid
        try{
            let user:UserModel = await userDbController.findUserByUserNameId(userName);
            if(user == null){ // User not found
                res.status(400).json({message: "User not found"});
            } else {
                let encryptedTypedPassword = cryptoUtils.encrypt(password);
                if(encryptedTypedPassword == user.passHash){
                    let token = cryptoUtils.createTokenToUser(user);
                    res.status(200).json({
                        id: user.id,
                        user_name: user.userName,
                        first_name: user.firstname,
                        last_name: user.lastName,
                        token: token
                    });
                } else{
                    res.status(400).json({message: "Password is not valid"});
                }
            }
        } catch(error){
            console.log(error);
            res.json({message: "Error quering user"});
        }
    }

    private generateLoggedInUserToBeReturned = (user: UserModel, token: String) => {
        return {
            id: user.id,
            user_name: user.userName,
            first_name: user.firstname,
            last_name: user.lastName,
            token: token
        }
    }

    private generateLoggedInUserToBeUsedOnToken = (user: UserModel) => {
        return {
            id: user.id,
            user_name: user.userName,
            first_name: user.firstname,
            last_name: user.lastName
        }
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
}

// Create the LoginRouter, and export its configured Express.Router
const loginRouter = new LoginRouter();
loginRouter.init();
export default loginRouter.router;

