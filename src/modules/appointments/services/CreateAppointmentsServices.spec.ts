// test('sum two number', () => {
//   expect(1 + 2).toBe(3);
// });

import FakeAppointmensRepository from '../repositories/fakes/FakeAppointmensRepository';
import CreateAppointmentService from './CreateAppointmentsServices';

describe('CreateAppointmentService', () => {
  it('Should be able to create a new appointment.', async () => {
    const fakeAppointmensRepository = new FakeAppointmensRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmensRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1212121212'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1212121212');
  });

  it('Should not be able to create two appointment on the same time.', async () => {
    const fakeAppointmensRepository = new FakeAppointmensRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmensRepository);

    const appointmentDate = new Date(2020, 10, 26, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1212121212'
    });

    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '1212121212'
    })).rejects.toBeInstanceOf(Error);
  });
});
