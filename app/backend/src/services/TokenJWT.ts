// @ts-ignore
import * as jwt from 'jsonwebtoken';
import IToken from '../Interfaces/IToken';
import IUser from '../Interfaces/IUser';
import { secret } from '../utils/JWTUtils';
import { jwtConfig } from '../utils/JWTUtils';

export default class Token implements IToken {
    generate(user: IUser): string {
        const token = jwt.sign({ id: user.id}, secret, jwtConfig);
        return token;
    }
}