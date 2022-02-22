import { BadRequest } from 'http-errors';
import { User,Stats } from '../models';
import { ErrorMessages } from '../constants';
import {
  comparePasswords, generateAccessToken, generateRefreshToken, hashPassword,
} from '../utils';

async function registerUser({ email, login, password }) {
  const existing = await User.findOne({
    where: {
      email,
    },
  });
  if (existing) throw new BadRequest(ErrorMessages.record_already_exists);

  const user = await User.create({
    email,
    login,
    password: hashPassword(password),
  });

  await Stats.create({
    userId: user.id,
    cryptocurrency: 0,
    dollars: 0,
    popularity: 0,
    mainPcLevel: 0,
    serverLevel: 0,
    minerLevel: 0,
    instructionsLevel: 0,
    passiveLevel: 0,
    activeLevel: 0,

  });

  return user.publish('dates');
}

async function loginUser({ email, password }) {
  const existingUser = await User.findOneOrFail({ email });

  if (!await comparePasswords(password, existingUser.password)) {
    throw new BadRequest(ErrorMessages.auth_invalid_login_password);
  }

  return [generateAccessToken(existingUser.id), generateRefreshToken(existingUser.id)];
}

async function getMyStats({ id }) {
  const user = await User.findOneOrFail({
    id,
  });
  return user.publish();
}

async function refreshTokens() {
  //
  return '';
}

export {
  registerUser,
  refreshTokens,
  loginUser,
  getMyStats,
};
