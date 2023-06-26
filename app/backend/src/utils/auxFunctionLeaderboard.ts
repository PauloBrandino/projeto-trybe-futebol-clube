import { IMatchWithTeam } from '../Interfaces/IMatch';

// Total Points
export function generalSumPoints(matches: IMatchWithTeam[], teamName: string) {
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
export function homeTotalPoints(matches: IMatchWithTeam[], teamName: string) {
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
export function awayTotalPoints(matches: IMatchWithTeam[], teamName: string) {
  const totalPoints = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.awayTeam.teamName === teamName) {
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
// Total Games
export function generalTotalGames(matches: IMatchWithTeam[], teamName: string) {
  const totalGames = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.homeTeam.teamName === teamName) return total + 1;
    if (match.awayTeam.teamName === teamName) return total + 1;
    return total;
  }, 0);
  return totalGames;
}
export function homeTotalGames(matches: IMatchWithTeam[], teamName: string) {
  const totalGames = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.homeTeam.teamName === teamName) return total + 1;
    return total;
  }, 0);
  return totalGames;
}
export function awayTotalGames(matches: IMatchWithTeam[], teamName: string) {
  const totalGames = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.awayTeam.teamName === teamName) return total + 1;
    return total;
  }, 0);
  return totalGames;
}
// Total Victories
export function generalTotalVictories(matches: IMatchWithTeam[], teamName: string) {
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
export function homeTotalVictories(matches: IMatchWithTeam[], teamName: string) {
  const totalVictories = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.homeTeam.teamName === teamName && match.homeTeamGoals > match.awayTeamGoals) {
      return total + 1;
    }
    return total;
  }, 0);
  return totalVictories;
}
export function awayTotalVictories(matches: IMatchWithTeam[], teamName: string) {
  const totalVictories = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.awayTeam.teamName === teamName && match.awayTeamGoals > match.homeTeamGoals) {
      return total + 1;
    }
    return total;
  }, 0);
  return totalVictories;
}
// Total Draws
export function generalSumTotalDraws(matches: IMatchWithTeam[], teamName: string) {
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
export function homeSumTotalDraws(matches: IMatchWithTeam[], teamName: string) {
  const totalDraws = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.homeTeam.teamName === teamName && match.homeTeamGoals === match.awayTeamGoals) {
      return total + 1;
    }
    return total;
  }, 0);
  return totalDraws;
}
export function awaySumTotalDraws(matches: IMatchWithTeam[], teamName: string) {
  const totalDraws = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.awayTeam.teamName === teamName && match.awayTeamGoals === match.homeTeamGoals) {
      return total + 1;
    }
    return total;
  }, 0);
  return totalDraws;
}
// Total Losses
export function generalTotalLosses(matches: IMatchWithTeam[], teamName: string) {
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
export function homeTotalLosses(matches: IMatchWithTeam[], teamName: string) {
  const totalLosses = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.homeTeam.teamName === teamName && match.homeTeamGoals < match.awayTeamGoals) {
      return total + 1;
    }
    return total;
  }, 0);
  return totalLosses;
}
export function awayTotalLosses(matches: IMatchWithTeam[], teamName: string) {
  const totalLosses = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.awayTeam.teamName === teamName && match.awayTeamGoals < match.homeTeamGoals) {
      return total + 1;
    }
    return total;
  }, 0);
  return totalLosses;
}
// Total Goals Favor
export function generalTotalGoalsFavor(matches: IMatchWithTeam[], teamName: string) {
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
export function homeTotalGoalsFavor(matches: IMatchWithTeam[], teamName: string) {
  const goalsFavor = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.homeTeam.teamName === teamName) return total + match.homeTeamGoals;
    return total;
  }, 0);
  return goalsFavor;
}
export function awayTotalGoalsFavor(matches: IMatchWithTeam[], teamName: string) {
  const goalsFavor = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.awayTeam.teamName === teamName) return total + match.awayTeamGoals;
    return total;
  }, 0);
  return goalsFavor;
}
// Total Goal Own
export function generalTotalGoalsOwn(matches: IMatchWithTeam[], teamName: string) {
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
export function homeTotalGoalsOwn(matches: IMatchWithTeam[], teamName: string) {
  const goalsOwn = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.homeTeam.teamName === teamName) return total + match.awayTeamGoals;
    return total;
  }, 0);
  return goalsOwn;
}
export function awayTotalGoalsOwn(matches: IMatchWithTeam[], teamName: string) {
  const goalsOwn = matches.reduce((total: number, match: IMatchWithTeam): number => {
    if (match.awayTeam.teamName === teamName) return total + match.homeTeamGoals;
    return total;
  }, 0);
  return goalsOwn;
}
