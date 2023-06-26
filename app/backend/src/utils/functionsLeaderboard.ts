import { route } from '../services/LeaderboardService';
import { IMatchWithTeam } from '../Interfaces/IMatch';

// Total Points
function generalSumPoints(matches: IMatchWithTeam[], teamName: string) {
    const totalPoints = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName) {
          if (match.homeTeamGoals > match.awayTeamGoals) {
            return total + 3;
          } if (match.homeTeamGoals === match.awayTeamGoals) {
            return total + 1;
          }
        } else if (match.awayTeam.teamName === teamName) {
          if (match.awayTeamGoals > match.homeTeamGoals) {
            return total + 3;
          } if (match.awayTeamGoals === match.homeTeamGoals) {
            return total + 1;
          }
        }
        return total;
      }, 0);
      return totalPoints;
}
function homeTotalPoints(matches: IMatchWithTeam[], teamName: string) {
    const totalPoints = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName) {
          if (match.homeTeamGoals > match.awayTeamGoals) {
            return total + 3;
          } if (match.homeTeamGoals === match.awayTeamGoals) {
            return total + 1;
          }
        }
        return total;
      }, 0);
      return totalPoints;
}
export function sumTotalPoints(matches: IMatchWithTeam[], teamName: string, route: route) {
  if(route === 'home') { 
    return homeTotalPoints(matches, teamName);
}
  return generalSumPoints(matches, teamName)
}

// TotalGames
function generalTotalGames(matches: IMatchWithTeam[], teamName: string) {
    const totalGames = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName) {
          return total + 1;
        } if (match.awayTeam.teamName === teamName) {
          return total + 1;
        }
        return total;
      }, 0);
      return totalGames;
}
function homeTotalGames(matches: IMatchWithTeam[], teamName: string) {
    const totalGames = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName) {
          return total + 1;
        }
        return total;
      }, 0);
      return totalGames;
}
export function sumTotalGames(matches: IMatchWithTeam[], teamName: string, route: route) {
  if(route === 'home')  return homeTotalGames(matches, teamName); 
  return generalTotalGames(matches, teamName);
}

// Total Victories
function generalTotalVictories(matches: IMatchWithTeam[], teamName: string) {
    const totalVictories = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName && match.homeTeamGoals > match.awayTeamGoals) {
          return total + 1;
        } if (match.awayTeam.teamName === teamName && match.awayTeamGoals > match.homeTeamGoals) {
          return total + 1;
        }
        return total;
      }, 0);
    
      return totalVictories;
}
function homeTotalVictories(matches: IMatchWithTeam[], teamName: string) {
    const totalVictories = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName && match.homeTeamGoals > match.awayTeamGoals) {
          return total + 1;
        } 
        return total;
      }, 0);
    
      return totalVictories;
}
export function sumTotalVictories(matches: IMatchWithTeam[], teamName: string, route: route): number {
    if(route === 'home') return homeTotalVictories(matches, teamName);
    return generalTotalVictories(matches, teamName);
}

// Total Draws
function generalSumTotalDraws(matches: IMatchWithTeam[], teamName: string) {
    const totalDraws = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName && match.homeTeamGoals === match.awayTeamGoals) {
          return total + 1;
        } if (match.awayTeam.teamName === teamName && match.awayTeamGoals === match.homeTeamGoals) {
          return total + 1;
        }
        return total;
      }, 0);
    
    return totalDraws;
}
function homeSumTotalDraws(matches: IMatchWithTeam[], teamName: string) {
    const totalDraws = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName && match.homeTeamGoals === match.awayTeamGoals) {
          return total + 1;
        } 
        return total;
      }, 0);
    
    return totalDraws;
}
export function sumTotalDraws(matches: IMatchWithTeam[], teamName: string, route: route): number {
  if(route === 'home') return homeSumTotalDraws(matches, teamName);  
  return generalSumTotalDraws(matches, teamName);
}

// Total Losses
function generalTotalLosses(matches: IMatchWithTeam[], teamName: string) {
    const totalLosses = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName && match.homeTeamGoals < match.awayTeamGoals) {
          return total + 1;
        } if (match.awayTeam.teamName === teamName && match.awayTeamGoals < match.homeTeamGoals) {
          return total + 1;
        }
        return total;
      }, 0);
    
      return totalLosses;
}
function homeTotalLosses(matches: IMatchWithTeam[], teamName: string) {
    const totalLosses = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName && match.homeTeamGoals < match.awayTeamGoals) {
          return total + 1;
        }
        return total;
      }, 0);
    
      return totalLosses;
}
export function sumTotalLosses(matches: IMatchWithTeam[], teamName: string, route: route): number {
  if(route === 'home') return homeTotalLosses(matches, teamName);

  return generalTotalLosses(matches, teamName);
}


// Total Goals Favor
function generalTotalGoalsFavor(matches: IMatchWithTeam[], teamName: string) {
    const goalsFavor = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName) {
          return total + match.homeTeamGoals;
        } if (match.awayTeam.teamName === teamName) {
          return total + match.awayTeamGoals;
        }
        return total;
      }, 0);
    
      return goalsFavor;
}
function homeTotalGoalsFavor(matches: IMatchWithTeam[], teamName: string) {
    const goalsFavor = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName) {
          return total + match.homeTeamGoals;
        }
        return total;
      }, 0);
    
      return goalsFavor;
}
export function sumGoalsFavor(matches: IMatchWithTeam[], teamName: string, route: route): number {
  if(route === 'home') return homeTotalGoalsFavor(matches, teamName);

  return generalTotalGoalsFavor(matches, teamName);
}


// Total Goals Own
function generalTotalGoalsOwn(matches: IMatchWithTeam[], teamName: string) {
    const goalsOwn = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName) {
          return total + match.awayTeamGoals;
        } if (match.awayTeam.teamName === teamName) {
          return total + match.homeTeamGoals;
        }
        return total;
      }, 0);
    
      return goalsOwn;
}
function homeTotalGoalsOwn(matches: IMatchWithTeam[], teamName: string) {
    const goalsOwn = matches.reduce((total: number, match: IMatchWithTeam): number => {
        if (match.homeTeam.teamName === teamName) {
          return total + match.awayTeamGoals;
        }
        return total;
      }, 0);
    
      return goalsOwn;
}
export function sumGoalsOwn(matches: IMatchWithTeam[], teamName: string, route: route): number {
  if(route === 'home') return homeTotalGoalsOwn(matches, teamName);

  return generalTotalGoalsOwn(matches, teamName);
}

// Calcula efficiency
export function efficiencyCalc(matches: IMatchWithTeam[], teamName: string, route: route): string { 
    if(route === 'home') {
     return ((homeTotalPoints(matches, teamName) / (homeTotalGames(matches, teamName) * 3)) * 100).toFixed(2);
    }
    return ((generalSumPoints(matches, teamName) / (generalTotalGames(matches, teamName) * 3)) * 100).toFixed(2);
}
