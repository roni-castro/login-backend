
export class UserModel{
    id: number;
    userName: String;
    firstname: String;
    lastName: String;
    passHash: String;

    constructor();
    constructor(id: number, userName: String, firstname: String, lastName: String, passHash: String);
    constructor(id?: number, userName?: String, firstname?: String, lastName?: String, passHash?: String){
        this.id = id;
        this.userName = userName;
        this.firstname = firstname;
        this.lastName = lastName;
        this.passHash = passHash;
    }
}