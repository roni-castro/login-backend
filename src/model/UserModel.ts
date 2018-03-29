
export class UserModel{
    id: number;
    userName: String;
    firstname: String;
    lastName: String;

    constructor();
    constructor(id: number, userName: String, firstname: String, lastName: String);
    constructor(id?: number, userName?: String, firstname?: String, lastName?: String){
        this.id = id;
        this.userName = userName;
        this.firstname = firstname;
        this.lastName = lastName;
    }
}