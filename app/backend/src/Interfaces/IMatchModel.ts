import { IMatchWithTeam } from './IMatch';

export default interface IMatchModel {
  getAllMatches(): Promise<IMatchWithTeam[]>
}
