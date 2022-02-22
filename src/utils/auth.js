import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { BadRequest } from 'http-errors';
import { JwtTypes, ErrorMessages } from '../constants';
import { config } from '../config';

export function generateAccessToken(id) {
  return jwt.sign({
    id,
    type: JwtTypes.ACCESS,
  },
  config.JWT_SECRET_KEY, {
    expiresIn: '10d',
  });
}

export function generateRefreshToken(id) {
  return jwt.sign({
    id,
    type: JwtTypes.REFRESH,
  },
  config.JWT_SECRET_KEY, {
    expiresIn: '10d',
  });
}

export function verifyToken(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new BadRequest(ErrorMessages.jwt_invalid_token);
  }
}

export function hashPassword(password) {
  return bcrypt.hashSync(password, 8);
}

export function comparePasswords(userPassword, hashedPassword) {
  return bcrypt.compare(userPassword, hashedPassword);
}
