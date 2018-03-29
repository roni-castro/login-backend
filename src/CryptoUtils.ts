import {Request, Response, NextFunction} from 'express';

const crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config()

class CryptoUtils{

    public encrypt = (dataToBeEncrypted: String): String => {
        let passwordSecret = process.env.LOGIN_CIPHER_KEY;
        var cipher = crypto.createCipher('aes-128-ecb', passwordSecret);
        let crypted = cipher.update(dataToBeEncrypted.toString(), 'utf8', 'base64');
        crypted += cipher.final('base64');
        return crypted;
    }

    public createTokenWith = (payloadObject) => {
        // sign with default (HMAC SHA256)
        var token = jwt.sign(payloadObject, process.env.JWT_SECRET_KEY, {expiresIn: "60"}); // 60 seconds
        return token;
    }

    public checkAuth = (req:Request, res:Response, next:NextFunction) => {
        try{
            let authorizationToken = req.headers.authorization;
            console.log("authorization: ", authorizationToken);
            var decoded = jwt.verify(authorizationToken, process.env.JWT_SECRET_KEY);
            req.body.user = decoded;
            console.log("decoded: ", decoded);
            next();
        } catch(error){
            res.status(403).json({message: "Authentication failed"});
        }
    }
}

const cryptoUtils = new CryptoUtils();
export default cryptoUtils;