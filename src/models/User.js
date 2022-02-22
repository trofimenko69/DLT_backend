import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './BaseModel';

export default class User extends BaseModel {
  static modelName = 'user';

  static tableName = 'users';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      scopes: ['system'],
      protected: true,
    },
  }

  static Settings = {
    // define validators, indexes, hooks and etc here
    hooks: {
      async beforeCreate(user) {
        user.id = uuid();
      },
    },
  }

  // eslint-disable-next-line no-unused-vars
  static associate(models) {
    User.hasOne(models.stats, {
      as: 'stats',
      foreignKey: {
        name: 'userId',
      },
    });
    // define association here
  }

  // publish(scopes) {
  //   const scoped = super.publish(scopes);
  //   if (!scoped.deletedAt) {
  //     delete scoped.deletedAt;
  //   }
  //   return scoped;
  // }
}
