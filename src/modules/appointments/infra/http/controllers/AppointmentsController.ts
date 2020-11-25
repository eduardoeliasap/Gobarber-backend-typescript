import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentsServices';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    // const appointmentsRepository = new AppointmentsRepository();
    // const createAppointment = new CreateAppointmentsServices(appointmentsRepository);
    const createAppointment = container.resolve(CreateAppointmentsServices);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return res.json(appointment);
  }

}

