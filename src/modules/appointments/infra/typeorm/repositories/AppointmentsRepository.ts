// import { EntityRepository, Repository } from 'typeorm';
import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '../../../dtos/ICreateAppointmentsDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

// @EntityRepository(Appointment)
// class AppointmentsRepository implements IAppointmentsRepository{
  // public async findByID(id: string): Promise<Appointment> {
  //   const appointment = await this.ormRepository.findByIds(id);

  //   if (!appointment) {
  //     throw new Error('Appointment not found');
  //   }

  //   return appointment;
  // }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }

  public async create({ provider_id, date }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;