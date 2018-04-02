"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDbController_1 = require("./controllers/UserDbController");
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config();
class CryptoUtils {
    constructor() {
        this.expirationTime = 120;
        this.encrypt = (dataToBeEncrypted) => {
            let passwordSecret = process.env.LOGIN_CIPHER_KEY;
            var cipher = crypto.createCipher('aes-128-ecb', passwordSecret);
            let crypted = cipher.update(dataToBeEncrypted.toString(), 'utf8', 'base64');
            crypted += cipher.final('base64');
            return crypted;
        };
        // sign with default (HMAC SHA256)
        this.createTokenToUser = (user) => {
            let payloadObject = this.createTokenPayload(user);
            var token = jwt.sign(payloadObject, process.env.JWT_SECRET_KEY, { expiresIn: this.expirationTime }); // 2 minutes
            return token;
        };
        this.createTokenPayload = (user) => {
            return {
                id: user.id,
                user_name: user.userName
            };
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
        this.refreshToken = (req, res, next, tokenData) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(tokenData.user_name);
                let user = yield UserDbController_1.default.findUserByUserNameId(tokenData.user_name);
                if (!user) { // User not found
                    console.log("User corresponding to the token was not found");
                    return null;
                }
                else {
                    let newToken = cryptoUtils.createTokenToUser(user);
                    res.header('Authorization', newToken);
                    return newToken;
                }
            }
            catch (error) {
                return null;
            }
        });
        this.decodeToken = (tokenToBeDecoded) => {
            return jwt.verify(tokenToBeDecoded, process.env.JWT_SECRET_KEY);
        };
    }
}
const cryptoUtils = new CryptoUtils();
exports.default = cryptoUtils;
