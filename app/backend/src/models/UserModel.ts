import IUserModel from '../Interfaces/IUserModel';
import IUser from '../Interfaces/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return {
      email: user.email,
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
    };
  }
}
