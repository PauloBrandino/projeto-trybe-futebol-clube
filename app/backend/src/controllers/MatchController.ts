import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchController {
  constructor(private matchService = new MatchesService()) {}

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchService.getAllMatches();

    return res.status(200).json(serviceResponse.data);
  }
}
