import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {nullable: false, unique: true })
    userName: string;

    @Column("varchar")
    firstName: string;

    @Column("varchar")
    lastName: string;

    @Column("varchar", {nullable: false})
    passHash: string;

    constructor();
    constructor(id: number, userName: string, firstName: string, lastName: string, passHash: string);
    constructor(id?: number, userName?: string, firstName?: string, lastName?: string, passHash?: string){
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passHash = passHash;
    }
}