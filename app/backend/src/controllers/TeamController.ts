import TeamService from "../services/TeamService";
import { Request, Response } from 'express';

export default class TeamController {
    constructor(private teamService = new TeamService()){}

    public async getAllTeams(req: Request, res: Response) {
        const serviceResponse = await this.teamService.getAllTeams();

        return res.status(200).json(serviceResponse.data);
    }
}