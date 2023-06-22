import ITeams from "../Interfaces/ITeams";
import ITeamModel from "../Interfaces/ITeamModel";
import SequelizeTeam from "../database/models/SequelizeTeam";

export default class TeamModel implements ITeamModel {
    private _model = SequelizeTeam;

    async getAllTeams(): Promise<ITeams[]> {
        const dbData = await this._model.findAll();

        return dbData.map(({ id, teamName}) => (
            { id, teamName }
        ));
    }

    async getTeamById(id: ITeams['id']): Promise<ITeams | null>{
        const dbData = await this._model.findByPk(id)
        if(dbData === null) return null;

        
        return dbData.dataValues
    }

}