import {Request, Response, NextFunction} from 'express';
import {UserModel} from './entity/UserModel';


const crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config()

class CryptoUtils{
    private expirationTime: Number = 120;

    public encrypt = (dataToBeEncrypted: string): string => {
        let passwordSecret = process.env.LOGIN_CIPHER_KEY;
        var cipher = crypto.createCipher('aes-128-ecb', passwordSecret);
        let crypted = cipher.update(dataToBeEncrypted.toString(), 'utf8', 'base64');
        crypted += cipher.final('base64');
        return crypted;
    }

     // sign with default (HMAC SHA256)
    public createTokenToUser = (userId, userName) => {
        let payloadObject = this.createTokenPayload(userId, userName);
        var token = jwt.sign(payloadObject, process.env.JWT_SECRET_KEY, {expiresIn: this.expirationTime}); // 2 minutes
        return token;
    }

    private createTokenPayload = (userId, userName) => {
        return {
            id: userId,
            user_name: userName
        }
    }

    public checkAuth = (req:Request, res:Response, next:NextFunction) => {
        try{
            var tokenData = this.decodeToken(req.headers.authorization);
            this.refreshToken(req, res, next, tokenData);
            next();
        } catch(error){
            res.status(403).json({message: "Authentication failed"});
        }
    }

    public refreshToken = async (req:Request, res:Response, next:NextFunction, tokenData) => {
        //try{
            //console.log(tokenData.user_name);
            // let user:UserModel = await userDbController.findUserByUserNameId(tokenData.user_name);
            // if(!user){ // User not found
            //     console.log("User corresponding to the token was not found");
            //     return null;
            // } else {
                let newToken = cryptoUtils.createTokenToUser(tokenData.id, tokenData.user_name);
                res.header('Authorization', newToken);
                return newToken;
            // }
        // } catch(error){
        //     return null;
        // }
    }

    public decodeToken = (tokenToBeDecoded) => {
        return jwt.verify(tokenToBeDecoded, process.env.JWT_SECRET_KEY);
    }
}

const cryptoUtils = new CryptoUtils();
export default cryptoUtils;