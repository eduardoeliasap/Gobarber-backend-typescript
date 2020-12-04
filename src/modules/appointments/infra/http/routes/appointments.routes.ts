import { Router } from 'express';
import AppointmentsController from '../controllers/AppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appoitmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// Garante que todas as rotas necessitam do tokem
appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.post('/', appointmentsController.create);

export default appoitmentsRouter;
