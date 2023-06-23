import IMatches from '../Interfaces/IMatches';
import IMatchModel from '../Interfaces/IMatchModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchesModel implements IMatchModel {
  private _model = SequelizeMatches;

  async getAllMatches(): Promise<IMatches[]> {
    const dbData = await this._model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }
}
