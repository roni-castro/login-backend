"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlConnection_1 = require("./MysqlConnection");
const UserModel_1 = require("./model/UserModel");
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config();
class CryptoUtils {
    constructor() {
        this.encrypt = (dataToBeEncrypted) => {
            let passwordSecret = process.env.LOGIN_CIPHER_KEY;
            var cipher = crypto.createCipher('aes-128-ecb', passwordSecret);
            let crypted = cipher.update(dataToBeEncrypted.toString(), 'utf8', 'base64');
            crypted += cipher.final('base64');
            return crypted;
        };
        this.createTokenWith = (payloadObject) => {
            // sign with default (HMAC SHA256)
            var token = jwt.sign(payloadObject, process.env.JWT_SECRET_KEY, { expiresIn: 120 }); // 2 minutes
            return token;
        };
        this.checkAuth = (req, res, next) => {
            try {
                var tokenData = this.decodeToken(req.headers.authorization);
                this.refreshToken(req, res, next, tokenData);
                next();
            }
            catch (error) {
                res.status(403).json({ message: "Authentication failed" });
            }
        };
        this.refreshToken = (req, res, next, tokenData) => {
            MysqlConnection_1.default.query("SELECT * FROM tb_user WHERE user_name = ?", [tokenData.user_name], function (err, results) {
                if (err) {
                    return null;
                }
                else {
                    if (results.length == 0) { // User not found
                        return null;
                    }
                    else {
                        var userFromDB = results[0];
                        let user = new UserModel_1.UserModel(userFromDB.id, userFromDB.user_name, userFromDB.first_name, userFromDB.last_name);
                        let newToken = cryptoUtils.createTokenWith({
                            id: user.id,
                            user_name: user.userName
                        });
                        req.headers.authorization = newToken;
                        console.log("NEW TOKEN " + newToken);
                        return newToken;
                    }
                }
            });
        };
        this.decodeToken = (tokenToBeDecoded) => {
            return jwt.verify(tokenToBeDecoded, process.env.JWT_SECRET_KEY);
        };
    }
}
const cryptoUtils = new CryptoUtils();
exports.default = cryptoUtils;
