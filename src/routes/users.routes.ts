import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import CreateUsersServices from '../services/CreateUsersServices';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const usersRepository = getRepository(User);
  const user = await usersRepository.find();

  return res.json(user);
});

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;


    const createUser = new CreateUsersServices();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.send(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
