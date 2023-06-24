export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

export type NewEntity<T> = Omit<T, 'id'>;

export interface IMatchWithTeam extends IMatch {
  homeTeam: string;
  awayTeam: string;
}
