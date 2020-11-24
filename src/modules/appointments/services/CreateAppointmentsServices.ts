import { startOfHour } from 'date-fns';
// import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
// import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentServices {
  constructor(
    private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentServices;
