
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
        this.router.get("/", cryptoUtils.checkAuth, this.getUsers);
        this.router.get("/:id", cryptoUtils.checkAuth, this.getSpecificUser);
        this.router.delete("/:id", cryptoUtils.checkAuth, this.deleteUser);
        this.router.post("/", this.createNewUser);
    }

    //GET api/user
    public getUsers = (req:Request, res:Response, next:NextFunction) => {
        connection.query("SELECT id, user_name, first_name, last_name FROM UserModel", function(err, users){
            if(err) {
                res.json({message: "Error getting users"});
                console.log(err);
            } else {
                res.json(users);
            }
        })
    }

    //DELETE api/user
    public deleteUser = (req:Request, res:Response, next:NextFunction) => {
        connection.query("DELETE FROM UserModel WHERE id = ?", [req.params.id], function(err, result){
            if(err) {
                res.status(400).json({message: "Error deleting user"});
                console.log(err);
            } else {
                if(result.affectedRows == 0){
                    res.status(404).json({message: "User not found"});
                } else {
                    res.status(204).json({});
                }
            }
        })
    }

     //GET api/user/id
     public getSpecificUser = (req:Request, res:Response, next:NextFunction) => {
        connection.query("SELECT id, user_name, first_name, last_name FROM UserModel WHERE id = ?", [req.params.id],
         function(err, result){
            if(err) {
                res.json({message: "Error getting user"});
                console.log(err);
            } else {
                if(result.length == 0){
                    res.status(404).json({message: "User not found"});
                } else {
                    res.json(result[0]);
                }
                
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
                "INSERT INTO UserModel (user_name, first_name, last_name, pass_hash) VALUES (?, ?, ?, ?)", 
                [userName, firstName, lastName, encryptedPass], function(err, newUser){
                if(err) {
                    if(err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({message: "User already exists"});
                    } else {
                        return res.status(400).json({message: "Error creating user"});
                    }
                } else {
                    return res.status(201).json();
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

