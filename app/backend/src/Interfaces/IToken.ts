import IUser from './IUser';

export default interface IToken {
  generate(user: IUser): string
}
