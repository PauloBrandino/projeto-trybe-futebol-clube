import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

function transformBoolean(inProgress: string): boolean {
  return inProgress === 'true';
}

export default class MatchController {
  constructor(private matchService = new MatchesService()) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (!inProgress) {
      const serviceResponse = await this.matchService.getAllMatches();

      return res.status(200).json(serviceResponse.data);
    }

    const verifyProgress = transformBoolean(inProgress as string);

    const serviceResponse = await this.matchService.getFilteredMatches(verifyProgress);

    return res.status(200).json(serviceResponse.data);
  }

  public async finishMath(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const finishedMath = await this.matchService.updateMatchToFinish(Number(id));

    return res.status(200).json({ message: finishedMath.data });
  }

  public async updateResultMatchInProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = req.body;

    const updatedMatch = await this.matchService.updateResultMatchInProgress(Number(id), result);

    return res.status(200).json(updatedMatch.data);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const dataToCreate = req.body;

    const serviceResponse = await this.matchService.createMatch(dataToCreate);
    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(404).json(serviceResponse.data);
    }

    return res.status(201).json(serviceResponse.data);
  }
}
