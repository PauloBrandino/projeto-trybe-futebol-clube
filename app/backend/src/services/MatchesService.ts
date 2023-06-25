import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/IMatch';
import IMatchModel, { resultUpdate } from '../Interfaces/IMatchModel';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(private matchModel: IMatchModel = new MatchesModel()) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.getAllMatches();

    return { status: 'SUCCESS', data: allMatches };
  }

  public async getFilteredMatches(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const filteredMatches = await this.matchModel.getFilteredMatches(inProgress);

    return { status: 'SUCCESS', data: filteredMatches };
  }

  public async updateMatchToFinish(id: number): Promise<ServiceResponse<string | null>> {
    const finishMatch = await this.matchModel.updateMatchToFinish(id);

    return { status: 'SUCCESS', data: finishMatch };
  }

  public async updateResultMatchInProgress(
    id: number,
    result: resultUpdate,
  ): Promise<ServiceResponse<string | null>> {
    const updatedMatch = await this.matchModel.updateResultMatchInProgress(id, result);

    return { status: 'SUCCESS', data: updatedMatch };
  }

  public async createMatch(dataToCreate: IMatch): Promise<ServiceResponse<IMatch>> {
    const verifyExistAwayTeam = await this.matchModel.findByPk(dataToCreate.awayTeamId);
    const verifyExistHomeTeam = await this.matchModel.findByPk(dataToCreate.homeTeamId);

    if (!verifyExistAwayTeam || !verifyExistHomeTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const create = await this.matchModel.createMatch(dataToCreate);

    return { status: 'SUCCESS', data: create };
  }
}
