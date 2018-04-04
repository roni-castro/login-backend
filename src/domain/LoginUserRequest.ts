
export class LoginUserRequest {
    readonly userName: string;
    readonly password: string;

    constructor(userName: string, password: string) {
        this.userName = userName;
        this.password = password;
    }
}