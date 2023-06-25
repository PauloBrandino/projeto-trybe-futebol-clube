import { IMatchWithTeam } from "../Interfaces/IMatch";

export function sumTotalPoints(matches: IMatchWithTeam[], teamName: string) {
    const totalPoints = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName) {
            if (match.homeTeamGoals > match.awayTeamGoals) {
              return total + 3;
            } else if (match.homeTeamGoals === match.awayTeamGoals) {
              return total + 1;
            }
          } else if (match.awayTeam.teamName === teamName) {
            if (match.awayTeamGoals > match.homeTeamGoals) {
              return total + 3;
            } else if (match.awayTeamGoals === match.homeTeamGoals) {
              return total + 1;
            }
          }
          return total;
    }, 0);
    return totalPoints;
};

export function sumTotalGames(matches: IMatchWithTeam[], teamName: string) {
    const totalGames = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if(match.homeTeam.teamName === teamName) {
            return total + 1;
        } else if (match.awayTeam.teamName === teamName) {
            return total + 1;
        };
        return total
    },0);
    return totalGames;
};

export function sumTotalVictories(matches: IMatchWithTeam[], teamName: string): number {
    const totalVictories = matches.reduce((total: number, match: IMatchWithTeam): number => {
      if (match.homeTeam.teamName === teamName && match.homeTeamGoals > match.awayTeamGoals) {
        return total + 1;
      } else if (match.awayTeam.teamName === teamName && match.awayTeamGoals > match.homeTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);
  
    return totalVictories;
};

export function sumTotalDraws(matches: IMatchWithTeam[], teamName: string): number {
    const totalDraws = matches.reduce((total: number, match: IMatchWithTeam): number => {
      if (match.homeTeam.teamName === teamName && match.homeTeamGoals === match.awayTeamGoals) {
        return total + 1;
      } else if (match.awayTeam.teamName === teamName && match.awayTeamGoals === match.homeTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);
  
    return totalDraws;
};