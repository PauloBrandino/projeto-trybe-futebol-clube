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
}
