import { Router } from 'express';
import appoitmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.use('/appointments', appoitmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
