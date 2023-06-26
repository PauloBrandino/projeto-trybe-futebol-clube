import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/IMatchModel';
import MatchesModel from '../models/MatchesModel';
import ILeaderboard from '../Interfaces/ILeaderboard';
import ITeamModel from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';
import { efficiencyCalc, route, sumGoalsFavor,
  sumGoalsOwn,
  sumTotalDraws,
  sumTotalGames,
  sumTotalLosses,
  sumTotalPoints,
  sumVictories,
} from '../utils/functionsLeaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchesModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  private async listLeaderboard(router: route): Promise<ILeaderboard[]> {
    const finishedMatch = await this.matchModel.getFilteredMatches(false);
    const getAllTeams = await this.teamModel.getAllTeams();
    const createLeaderboard = getAllTeams.map((team) => {
      const teamAverage = { name: team.teamName,
        totalPoints: sumTotalPoints(finishedMatch, team.teamName, router),
        totalGames: sumTotalGames(finishedMatch, team.teamName, router),
        totalVictories: sumVictories(finishedMatch, team.teamName, router),
        totalDraws: sumTotalDraws(finishedMatch, team.teamName, router),
        totalLosses: sumTotalLosses(finishedMatch, team.teamName, router),
        goalsFavor: sumGoalsFavor(finishedMatch, team.teamName, router),
        goalsOwn: sumGoalsOwn(finishedMatch, team.teamName, router),
        goalsBalance: sumGoalsFavor(finishedMatch, team
          .teamName, router) - sumGoalsOwn(finishedMatch, team.teamName, router),
        efficiency: efficiencyCalc(finishedMatch, team.teamName, router),
      }; return teamAverage;
    });

    return createLeaderboard;
  }

  public async orderListLeaderboard(router: route): Promise<ServiceResponse<ILeaderboard[]>> {
    const list = await this.listLeaderboard(router);

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
