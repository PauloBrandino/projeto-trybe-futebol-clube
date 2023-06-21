import ITeams from "../Interfaces/ITeams";
import ITeamModel from "../Interfaces/ITeamModel";
import SequelizeTeam from "../database/models/SequelizeTeam";

export default class TeamModel implements ITeamModel {
    private _model = SequelizeTeam;

    async findAll(): Promise<ITeams[]> {
        const dbData = await this._model.findAll();

        return dbData.map(({ id, team_name}) => (
            { id, team_name }
        ));
    }

}