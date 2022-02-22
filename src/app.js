import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ErrorHandler } from './middlewares';
import {
  authRouter,
  usersRouter,
} from './routes';

const app = express();

// configuration section
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(morgan('tiny'));

// app routing
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// health check request
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// app error handling
app.use(ErrorHandler);

export default app;
