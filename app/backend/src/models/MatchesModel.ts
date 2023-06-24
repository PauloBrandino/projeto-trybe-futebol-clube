import { IMatchWithTeam } from '../Interfaces/IMatch';
import IMatchModel from '../Interfaces/IMatchModel';
import SequelizeMatches from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchesModel implements IMatchModel {
  private _model = SequelizeMatches;

  async getAllMatches(): Promise<IMatchWithTeam[]> {
    const dbData = await this._model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData as unknown as IMatchWithTeam[];
  }

  async getFilteredMatches(inProgress: boolean): Promise<IMatchWithTeam[]> {
    const dbData = await this._model.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData as unknown as IMatchWithTeam[];
  }
}
