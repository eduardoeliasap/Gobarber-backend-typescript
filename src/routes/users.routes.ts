import { Router } from 'express';

import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsServices from '../services/CreateAppointmentsServices';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    return res.send();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
