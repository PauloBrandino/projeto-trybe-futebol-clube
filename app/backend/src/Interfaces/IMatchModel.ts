import { IMatchWithTeam } from './IMatch';

export default interface IMatchModel {
  getAllMatches(): Promise<IMatchWithTeam[]>
  getFilteredMatches(inProgress: boolean): Promise<IMatchWithTeam[]>
}
