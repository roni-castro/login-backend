import {Router, Request, Response, NextFunction} from 'express';
import cryptoUtils from '../CryptoUtils';
import {UserModel} from '../entity/UserModel'
import {UserRepository} from '../data/UserRepository'

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
        let userName:string = req.body.user_name;
        let password:string = req.body.password;

        if(! this.isValidLoginCredentials(userName, password)){
            return res.status(400).json(this.setUpUnableToLoginErrors(userName, password));
        }
        let user = await new UserRepository().findUserByUserName(userName)
        .then(function(user) {
            let encryptedTypedPassword = cryptoUtils.encrypt(password);
            if(encryptedTypedPassword == user.passHash){
                let token = cryptoUtils.createTokenToUser(user);
                res.status(200).json({
                    id: user.id,
                    user_name: user.userName,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    token: token
                });
            } else{
                res.status(400).json({message: "Password is not valid"});
            }
        })
        .catch (function(error) {
            console.log(error);
            res.status(400).json({message: "User not found"});
        });
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

