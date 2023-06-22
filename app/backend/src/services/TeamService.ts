import ITeamModel from '../Interfaces/ITeamModel';
import ITeams from '../Interfaces/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamModel.getAllTeams();

    return { status: 'SUCCESS', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const getTeam = await this.teamModel.getTeamById(id);
    if (!getTeam) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };

    return { status: 'SUCCESS', data: getTeam };
  }
}
