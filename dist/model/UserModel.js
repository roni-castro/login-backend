"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
    constructor(id, userName, firstname, lastName, passHash) {
        this.id = id;
        this.userName = userName;
        this.firstname = firstname;
        this.lastName = lastName;
        this.passHash = passHash;
    }
}
exports.UserModel = UserModel;
