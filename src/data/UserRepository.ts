import {Service} from "typedi";
import {Repository} from "typeorm";
import { UserModel } from "../entity/UserModel";
import { OrmRepository } from 'typeorm-typedi-extensions';
import cryptoUtils from '../CryptoUtils';

@Service()
export class UserRepository {

  constructor(
    @OrmRepository(UserModel) protected dbOrmRepository: Repository<UserModel>
  ) {}
    
    public async findUserByUserName(userName: string) {
      return await this.dbOrmRepository.findOne({userName});
    }  

    public async createNewUser() {
      let user = new UserModel();
      user.userName = 'roni';
      user.firstName = 'roni';
      user.lastName = 'castro';
      let encryptedTypedPassword = cryptoUtils.encrypt('12345');
      user.passHash =  encryptedTypedPassword;
      return await this.dbOrmRepository.save(user);
    }  
}



