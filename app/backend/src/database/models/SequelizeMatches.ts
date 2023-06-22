import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';
// import OtherModel from './OtherModel';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number
  declare homeTeamGoals: number
  declare awayTeamId: number
  declare awayTeamGoals: number
  declare inProgress: boolean
}

SequelizeMatches.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  }, {
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  });

SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeams' });
SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeams' });

SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'homeTeams' });
SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'awayTeamId', as: 'awayTeams' });

export default SequelizeMatches;
