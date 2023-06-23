import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export const secret = process.env.JWT_SECRET || '123asd456qwe789zxc';

export function verifyToken(token: string): JwtPayload | string {
  const decodeToken = jwt.verify(token, secret);

  return decodeToken;
}
