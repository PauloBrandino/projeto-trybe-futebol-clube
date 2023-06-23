import * as jwt from 'jsonwebtoken';
import IToken from '../Interfaces/IToken';
import IUser from '../Interfaces/IUser';
import { secret } from '../utils/JWTUtils';

export default class TokenJWT implements IToken {
  private jwt = jwt;
  generate(user: IUser): string {
    const { password, ...sendJWT } = user;
    const token = this.jwt.sign(sendJWT, secret);
    return token;
  }
}
