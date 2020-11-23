import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../../modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentsServices from '../../modules/appointments/services/CreateAppointmentsServices';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appoitmentsRouter = Router();
// const appointmentsRepository = new AppointmentsRepository();

// Garante que todas as rotas necessitam do tokem
appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appoitmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentsServices();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appoitmentsRouter;
