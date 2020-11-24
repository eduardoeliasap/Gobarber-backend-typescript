import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserServices(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
