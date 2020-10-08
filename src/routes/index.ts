import { Router } from 'express';
import appoitmentsRouter from './appointments.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.use('/appointments', appoitmentsRouter);

// routes.post('/users', (req, res) => {
//   const { name, email } = req.body;

//   const user = {
//     name,
//     email,
//   };

//   return res.json(user);
// });

export default routes;
