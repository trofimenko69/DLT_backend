import { Router } from 'express';
import { wrap } from '../utils';
import { UsersController } from '../controllers';
import { passportAuthMiddleware } from '../middlewares';
import { JwtTypes } from '../constants';

const usersRouter = Router();

usersRouter.get(
  '/',
  passportAuthMiddleware(JwtTypes.ACCESS),
  wrap(async (req, res) => {
    const users = await UsersController.getUsers();
    res.status(201).json(users);
  }),
);

export { usersRouter };
