import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishMath(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateResultMatchInProgress(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
