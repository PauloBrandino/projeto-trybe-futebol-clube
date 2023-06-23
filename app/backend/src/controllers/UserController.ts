import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { verifyToken } from '../utils/JWTUtils';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const serviceResponse = await this.userService.login(email, password);

    if (serviceResponse.status !== 'SUCCESS') {
      const code = mapStatusHTTP(serviceResponse.status);
      return res.status(code).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async userRole(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;

    const verify = verifyToken.bind(this)(authorization as string);

    if (typeof verify === 'string') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    return res.status(200).json({ role: verify.role });
  }
}
