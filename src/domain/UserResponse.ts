
export class UserResponse{
    readonly id: number;
    readonly userName: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly token: string;

    constructor(id: number, userName: string, firstName: string, lastName: string, token: string){
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
    }
}
