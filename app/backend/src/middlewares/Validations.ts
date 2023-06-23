import { NextFunction, Request, Response } from 'express';
import { verifyPassword, verifyEmail } from '../utils/verifyLoginFunctions';
import { verifyToken } from '../utils/JWTUtils';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;

    if (!user.email || !user.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!verifyEmail(user.email) || !verifyPassword(user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    try {
      verifyToken(authorization);
    } catch (error) {
      return res.status(401)
        .json({ message: 'Token must be a valid token' });
    }

    next();
  };
}
