import IMatches from './IMatches';

export default interface IMatchModel {
  getAllMatches(): Promise<IMatches[]>
}
