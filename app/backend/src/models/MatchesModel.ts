import { IMatch, IMatchWithTeam, NewEntity } from '../Interfaces/IMatch';
import IMatchModel, { resultUpdate } from '../Interfaces/IMatchModel';
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

  async updateMatchToFinish(id: number): Promise<string | null> {
    const [affectedRows] = await this._model.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );
    if (affectedRows === 0) return null;

    return 'Finished';
  }

  async updateResultMatchInProgress(id: number, result: resultUpdate): Promise<string | null> {
    const [affectedRows] = await this._model.update(
      {
        homeTeamGoals: result.homeTeamGoals,
        awayTeamGoals: result.awayTeamGoals,
      },
      {
        where: { id },
      },
    );
    if (affectedRows === 0) return null;

    return 'Updated';
  }

  async createMatch(dataToCreate: NewEntity<IMatch>): Promise<IMatch> {
    const fullDataToCreate = { ...dataToCreate, inProgress: true };
    const create = await this._model.create(fullDataToCreate);

    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = create;

    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async findByPk(param: number): Promise<IMatch | null> {
    const dbData = await this._model.findByPk(param);

    return dbData;
  }
}
