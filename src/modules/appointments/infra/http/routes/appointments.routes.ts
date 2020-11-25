import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appoitmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// Garante que todas as rotas necessitam do tokem
appoitmentsRouter.use(ensureAuthenticated);

// appoitmentsRouter.get('/:id', async (req, res) => {
//   // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const id = req.params;

//   const appointmensRepository = getRepository(AppointmentsRepository);
//   const appointments = await appointmensRepository.find(id);

//   return res.json(appointments);
// });

appoitmentsRouter.post('/', appointmentsController.create);

export default appoitmentsRouter;
