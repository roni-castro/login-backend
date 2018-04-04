import {Service} from "typedi";
import {Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";
import { UserModel } from "../entity/UserModel";
 
@Service()
export class UserRepository {

  @InjectRepository(UserModel)
    private repository: Repository<UserModel>;
    
    public async findUserByUserName(userName: string) {
      return await this.repository.findOne({userName});
    }  
}