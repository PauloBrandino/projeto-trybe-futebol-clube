import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/IMatchModel';
import MatchesModel from '../models/MatchesModel';
import ILeaderboard from '../Interfaces/ILeaderboard';
import ITeamModel from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';
import { efficiencyCalc, sumGoalsFavor,
  sumGoalsOwn,
  sumTotalDraws,
  sumTotalGames,
  sumTotalLosses,
  sumTotalPoints,
  sumTotalVictories,
} from '../utils/functionsLeaderboard';

export type route = 'home' | undefined;

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchesModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  private async listLeaderboard(route: route): Promise<ILeaderboard[]> {
    const finishedMatch = await this.matchModel.getFilteredMatches(false);
    const getAllTeams = await this.teamModel.getAllTeams();
    const createLeaderboard = getAllTeams.map((team) => {
      const teamAverage = { name: team.teamName,
        totalPoints: sumTotalPoints(finishedMatch, team.teamName, route),
        totalGames: sumTotalGames(finishedMatch, team.teamName, route),
        totalVictories: sumTotalVictories(finishedMatch, team.teamName, route),
        totalDraws: sumTotalDraws(finishedMatch, team.teamName, route),
        totalLosses: sumTotalLosses(finishedMatch, team.teamName, route),
        goalsFavor: sumGoalsFavor(finishedMatch, team.teamName, route),
        goalsOwn: sumGoalsOwn(finishedMatch, team.teamName, route),
        goalsBalance: sumGoalsFavor(finishedMatch, team
          .teamName, route) - sumGoalsOwn(finishedMatch, team.teamName, route),
        efficiency: efficiencyCalc(finishedMatch, team.teamName, route),
      }; return teamAverage;
    });

    return createLeaderboard;
  }

  public async orderListLeaderboard(route: route): Promise<ServiceResponse<ILeaderboard[]>> {
    const list = await this.listLeaderboard(route);

    const orderedList = list.sort((compareTeamA: ILeaderboard, compareTeamB: ILeaderboard) => {
      if (compareTeamA.totalPoints !== compareTeamB.totalPoints) {
        return compareTeamB.totalPoints - compareTeamA.totalPoints;
      } if (compareTeamA.goalsBalance !== compareTeamB.goalsBalance) {
        return compareTeamB.goalsBalance - compareTeamA.goalsBalance;
      }
      return compareTeamB.goalsFavor - compareTeamA.goalsFavor;
    });

    return { status: 'SUCCESS', data: orderedList };
  }
}
