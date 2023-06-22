import * as jwt from 'jsonwebtoken';
import IToken from '../Interfaces/IToken';
import IUser from '../Interfaces/IUser';
import { secret } from '../utils/JWTUtils';

export default class TokenJWT implements IToken {
  private jwt = jwt;
  generate(user: IUser): string {
    const token = this.jwt.sign({ id: user.id }, secret);
    return token;
  }
}
