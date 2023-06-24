import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/IMatch';
import IMatchModel from '../Interfaces/IMatchModel';
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
}
