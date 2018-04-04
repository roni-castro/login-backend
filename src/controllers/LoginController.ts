
import {LoginUserRequest } from '../domain/LoginUserRequest'
import {LoginUserResponse } from '../domain/LoginUserResponse'
import {LoginUseCase} from '../domain/LoginUseCase';
import {Service} from "typedi";
import {BodyParam, Post, JsonController} from 'routing-controllers';

@JsonController()
export class LoginController {

    constructor(private readonly loginUseCase: LoginUseCase){
        console.log('controller')
    }

    @Post("/session")
    async login(
        @BodyParam("user_name") userName: string, 
        @BodyParam("password") password: string) 
    {
        const useCaseRequest = new LoginUserRequest(userName, password);
        const useCaseResponse = await this.loginUseCase.exec(useCaseRequest);
        return useCaseResponse;
    }
}

