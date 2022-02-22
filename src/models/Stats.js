import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';

export default class Stats extends BaseModel {
  static modelName = 'stats';

  static tableName = 'stats';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    // userID not writing here
    cryptocurrency: {
      type: DataTypes.BIGINT,
    },
    dollars: {
      type: DataTypes.BIGINT,
    },
    popularity: {
      type: DataTypes.INTEGER,
    },
    mainPcLevel: {
      type: DataTypes.INTEGER,
    },
    serverLevel: {
      type: DataTypes.INTEGER,
    },
    minerLevel: {
      type: DataTypes.INTEGER,
    },
    instructionsLevel: {
      type: DataTypes.INTEGER,
    },
    passiveLevel: {
      type: DataTypes.INTEGER,
    },
    activeLevel: {
      type: DataTypes.INTEGER,
    },
  }

  static Settings = {
    // define validators, indexes, hooks and etc here
    hooks: {
      async beforeCreate(profile) {
        profile.id = uuid();
      },
    },
  }

  static associate(models) {
    Stats.belongsTo(models.user, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
    });
    // define association here
  }
}
