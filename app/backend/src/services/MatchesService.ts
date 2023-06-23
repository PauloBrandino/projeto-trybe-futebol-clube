import { ServiceResponse } from "../Interfaces/ServiceResponse";
import IMatches from "../Interfaces/IMatches";
import IMatchModel from "../Interfaces/IMatchModel";
import MatchesModel from "../models/MatchesModel";

export default class MatchesService {
    constructor(private matchModel: IMatchModel = new MatchesModel()) {}

    public async getAllMatches():  Promise<ServiceResponse<IMatches[]>> {
        const allMatches = await this.matchModel.getAllMatches();

        return { status: 'SUCCESS', data: allMatches }; 
    }
}