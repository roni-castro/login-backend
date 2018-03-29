import {Request, Response, NextFunction} from 'express';
import connection from './MysqlConnection';
import {UserModel} from './model/UserModel'

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
        var token = jwt.sign(payloadObject, process.env.JWT_SECRET_KEY, {expiresIn: 120}); // 2 minutes
        return token;
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

    public refreshToken = (req:Request, res:Response, next:NextFunction, tokenData) => {
        connection.query(
            "SELECT * FROM tb_user WHERE user_name = ?", 
            [tokenData.user_name], function(err, results){
            if(err) {
                return null;
            } else {
                if(results.length == 0){ // User not found
                    return null;
                } else {
                    var userFromDB = results[0];
                    let user = new UserModel(userFromDB.id, userFromDB.user_name, userFromDB.first_name, userFromDB.last_name);
                    let newToken = cryptoUtils.createTokenWith({
                        id: user.id,
                        user_name: user.userName
                    });
                    req.headers.authorization = newToken;
                    console.log("NEW TOKEN " + newToken);
                    return newToken;
                }
            }
        })
    }

    public decodeToken = (tokenToBeDecoded) => {
        return jwt.verify(tokenToBeDecoded, process.env.JWT_SECRET_KEY);
    }
}

const cryptoUtils = new CryptoUtils();
export default cryptoUtils;