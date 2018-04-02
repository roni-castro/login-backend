"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MysqlConnection_1 = require("../MysqlConnection");
const UserModel_1 = require("../model/UserModel");
class UserDbController {
    constructor() {
        this.findUserByUserNameId = (userName) => {
            return new Promise((resolve, reject) => {
                MysqlConnection_1.default.query("SELECT * FROM tb_user WHERE user_name = ?", [userName], function (err, results) {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        if (results.length > 0) {
                            let userFromDB = results[0];
                            let user = new UserModel_1.UserModel(userFromDB.id, userFromDB.user_name, userFromDB.first_name, userFromDB.last_name, userFromDB.pass_hash);
                            return resolve(user);
                        }
                        else {
                            return resolve(null);
                        }
                    }
                });
            });
        };
    }
}
exports.default = new UserDbController();
