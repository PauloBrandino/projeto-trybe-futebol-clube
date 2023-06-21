import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeMatches from './SequelizeMatches';
// import OtherModel from './OtherModel';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;
  declare team_name: string
}

SequelizeTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'home_team_id', as: 'homeMatches' });
SequelizeMatches.belongsTo(SequelizeTeam, { foreignKey: 'away_team_id', as: 'awayMatches' });

SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'home_team_id', as: 'homeTeams' });
SequelizeTeam.hasMany(SequelizeMatches, { foreignKey: 'away_team_id', as: 'awayTeams' });

export default SequelizeTeam;
