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

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchesModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async listLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const finishedMatch = await this.matchModel.getFilteredMatches(false);
    const getAllTeams = await this.teamModel.getAllTeams();
    const createLeaderboard = getAllTeams.map((team) => {
      const teamAverage = { name: team.teamName,
        totalPoints: sumTotalPoints(finishedMatch, team.teamName),
        totalGames: sumTotalGames(finishedMatch, team.teamName),
        totalVictories: sumTotalVictories(finishedMatch, team.teamName),
        totalDraws: sumTotalDraws(finishedMatch, team.teamName),
        totalLosses: sumTotalLosses(finishedMatch, team.teamName),
        goalsFavor: sumGoalsFavor(finishedMatch, team.teamName),
        goalsOwn: sumGoalsOwn(finishedMatch, team.teamName),
        goalsBalance: sumGoalsFavor(finishedMatch, team
          .teamName) - sumGoalsOwn(finishedMatch, team.teamName),
        efficiency: efficiencyCalc(sumTotalPoints(finishedMatch, team
          .teamName), sumTotalGames(finishedMatch, team.teamName)),
      }; return teamAverage;
    });

    return { status: 'SUCCESS', data: createLeaderboard };
  }
}
