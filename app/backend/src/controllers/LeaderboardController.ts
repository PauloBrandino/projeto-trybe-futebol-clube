import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderBoardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async listLeaderboard(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.orderListLeaderboard();

    return res.status(200).json(serviceResponse.data);
  }
}
