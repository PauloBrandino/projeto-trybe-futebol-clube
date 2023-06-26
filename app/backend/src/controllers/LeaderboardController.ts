import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderBoardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public async listLeaderboard(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.orderListLeaderboard(undefined);

    return res.status(200).json(serviceResponse.data);
  }

  public async listLeaderboardHome(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.orderListLeaderboard('home');

    return res.status(200).json(serviceResponse.data);
  }

  public async listLeaderboardAway(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.leaderboardService.orderListLeaderboard('away');

    return res.status(200).json(serviceResponse.data);
  }
}
