import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare home_team_id: number
  declare home_team_goals: number
  declare away_team_id: number
  declare away_team_goals: number
  declare in_progress: boolean
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  home_team_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  home_team_goals: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  away_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  away_team_goals: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  in_progress: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  }
  }, {
  sequelize: db,
  modelName: 'Matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default SequelizeMatches;
