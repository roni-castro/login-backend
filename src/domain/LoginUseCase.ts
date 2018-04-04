
import cryptoUtils from '../CryptoUtils';
import {UserModel} from '../entity/UserModel'
import {UserRepository} from '../data/UserRepository'
import {BaseUseCase} from './BaseUseCase'
import { AuthenticationError } from '../core/error/AuthenticationError'
import {InvalidFieldError } from '../core/error/InvalidFieldError'
import {LoginUserRequest } from '../domain/LoginUserRequest'
import {LoginUserResponse } from '../domain/LoginUserResponse'
import { Service } from 'typedi';

@Service()
export class LoginUseCase implements BaseUseCase<LoginUserRequest, LoginUserResponse> {
    constructor(
        private readonly userRepository: UserRepository
    ) { console.log('usecase')}

    async exec(request: LoginUserRequest): Promise<LoginUserResponse> {
        let userName:string = request.userName;
        let password:string = request.password;

        if(! this.isValidFields(userName, password)){
            throw new InvalidFieldError('User name and password field are required'); 
        }

        let user = await this.userRepository.findUserByUserName(userName);

        if (!user) {
            throw new AuthenticationError('User not found.');
        }

        let encryptedTypedPassword = cryptoUtils.encrypt(password);
        if(encryptedTypedPassword != user.passHash){
            throw new AuthenticationError('Invalid user name or password'); 
        }

        let token = cryptoUtils.createTokenToUser(user.id, user.userName);
        return new LoginUserResponse(user.id, user.userName, user.firstName, user.lastName, token);
    }

    private isValidFields = (userName: String, password: String) => {
        // return userName && password;
        if(userName && password){
            return true;
        } else{
            return false;
        }
    }
}


