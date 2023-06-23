import { NextFunction, Request, Response } from 'express';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredFields = ['email', 'password'];
    const notFoundField = requiredFields.find((field) => !(field in user));

    if (notFoundField) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}
