import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderBoardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.listLeaderboard(req, res),
);
router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.listLeaderboardHome(req, res),
);
router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.listLeaderboardAway(req, res),
);

export default router;
