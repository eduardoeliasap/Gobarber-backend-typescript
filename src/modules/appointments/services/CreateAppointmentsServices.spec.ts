// test('sum two number', () => {
//   expect(1 + 2).toBe(3);
// });

import FakeAppointmensRepository from '../repositories/fakes/FakeAppointmensRepository';
import CreateAppointmentService from './CreateAppointmentsServices';

let fakeAppointmensRepository: FakeAppointmensRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmensRepository = new FakeAppointmensRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmensRepository);
  });

  it('Should be able to create a new appointment.', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1212121212'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1212121212');
  });

  it('Should not be able to create two appointment on the same time.', async () => {
    const appointmentDate = new Date(2020, 10, 26, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1212121212'
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '1212121212'
    })).rejects.toBeInstanceOf(Error);
  });
});
