import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/sequelize';

import User from './User';
import Stats from './Stats';

const {
  database, username, password, ...configs
} = dbConfig;
const sequelize = new Sequelize(database, username, password, configs);

// initialize models
User.initialize(sequelize);
Stats.initialize(sequelize);

// associate models
User.associate(sequelize.models);
Stats.associate(sequelize.models);

export {
  sequelize,
  Sequelize,
  User,
  Stats,
};
