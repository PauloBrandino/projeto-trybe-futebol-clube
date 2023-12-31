import { IMatch, IMatchWithTeam } from './IMatch';

export type resultUpdate = {
  homeTeamGoals: number,
  awayTeamGoals: number
};
export default interface IMatchModel {
  getAllMatches(): Promise<IMatchWithTeam[]>
  getFilteredMatches(inProgress: boolean): Promise<IMatchWithTeam[]>
  updateMatchToFinish(id: number): Promise<string | null>
  updateResultMatchInProgress(id: number, result: resultUpdate): Promise<string | null>
  createMatch(dataToCreate: IMatch): Promise<IMatch>
  findByPk(param: number): Promise<IMatch | null>
}
