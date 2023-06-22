import UserModel from "../models/UserModel";
import IUserModel from "../Interfaces/IUserModel";
import { ServiceResponse } from "../Interfaces/ServiceResponse";
import IEncrypter from "../Interfaces/IEncrypter";
import Encrypter from "./Encrypter";
import IToken from "../Interfaces/IToken";
import Token from "./TokenJWT";

export default class UserService {
    constructor(
        private userModel: IUserModel = new UserModel(),
        private encrypter: IEncrypter = new Encrypter(),
        private tokenGenerator: IToken = new Token()) {};

    public async login(email: string, password: string): Promise<ServiceResponse<{token: string}>> {
        const getUser = await this.userModel.getByEmail(email);

        if(!getUser) {
            return { status: 'UNAUTHORIZED', data: { message: 'E-mail ou senha invalida' }};
        };

        const verify = await this.encrypter.compare(password, getUser.password);

        if(!verify) {
            return { status: 'UNAUTHORIZED', data: { message: 'E-mail ou senha invalida' }};
        }

        const token = this.tokenGenerator.generate(getUser);

        return {
            status: 'SUCCESS',
            data: { token }
        };
    }
}