import ITeamModel from "../Interfaces/ITeamModel";
import ITeams from "../Interfaces/ITeams";
import { ServiceResponse } from "../Interfaces/ServiceResponse";
import TeamModel from "../models/TeamModel";

export default class TeamService {
    
    constructor(private teamModel: ITeamModel = new TeamModel()){}

    public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
        const allTeams = await this.teamModel.findAll()

        return { status: 'SUCCESS', data: allTeams}
    }
}