import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.listLeaderboard(req, res),
);

export default router;
