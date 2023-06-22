import ITeams from "./ITeams";

export default interface ITeamModel {
    findAll(): Promise<ITeams[]>
    findById(id: number): Promise<ITeams | null> 
}