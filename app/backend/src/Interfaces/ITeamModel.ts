import ITeams from "./ITeams";

export default interface ITeamModel {
    getAllTeams(): Promise<ITeams[]>
    getTeamById(id: ITeams['id']): Promise<ITeams | null> 
}