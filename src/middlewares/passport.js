import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Unauthorized } from 'http-errors';
import { config } from '../config';

const JwtSecretKey = config.JWT_SECRET_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JwtSecretKey,
};

const jwtStrategy = (type) => new JwtStrategy(
  opts,
  (payload, next) => (
    payload.type !== type
      ? next(new Unauthorized(`Bad jwt ${payload.type} type. Provide pls ${type} jwt type`), null)
      : next(null, payload)),
);

export function passportAuthMiddleware(jwtType) {
  return passport.authenticate(jwtStrategy(jwtType), {
    session: false,
  });
}
