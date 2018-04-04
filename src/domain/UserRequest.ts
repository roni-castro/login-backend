export class UserRequest {
    readonly userName: string;
    readonly password: string;

    constructor(userName: string, password: string) {
        this.userName = userName;
        this.password = password;
    }
}