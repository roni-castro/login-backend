"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginUserResponse {
    constructor(id, userName, firstName, lastName, token) {
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
    }
}
exports.LoginUserResponse = LoginUserResponse;
