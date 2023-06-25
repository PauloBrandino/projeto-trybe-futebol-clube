import { ServiceResponse } from "../Interfaces/ServiceResponse";
import IMatchModel from "../Interfaces/IMatchModel";
import MatchesModel from "../models/MatchesModel";
import ILeaderboard from "../Interfaces/ILeaderboard";
import ITeamModel from "../Interfaces/ITeamModel";
import TeamModel from "../models/TeamModel";
import { sumTotalGames, sumTotalPoints, sumTotalVictories } from "../utils/functionsLeaderboard";

export default class LeaderboardService {
    constructor(private matchModel: IMatchModel = new MatchesModel(),
    private teamModel: ITeamModel = new TeamModel()) {};

    public async listLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
        const finishedMatch = await this.matchModel.getFilteredMatches(false);
        const getAllTeams = await this.teamModel.getAllTeams();

        const createLeaderboard = getAllTeams.map((team) => {
            const teamAverage = {
                name: team.teamName,
                totalPoints: sumTotalPoints(finishedMatch, team.teamName),
                totalGames: sumTotalGames(finishedMatch, team.teamName),
                totalVictories: sumTotalVictories(finishedMatch, team.teamName),
                totalDraws: 2,
                totalLosses: 1,
                goalsFavor: 100,
                goalsOwn: 2,
            };
            return teamAverage
        })
    
        return { status: 'SUCCESS', data: createLeaderboard};
      }
}