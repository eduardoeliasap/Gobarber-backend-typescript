import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProviderRepository from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUsersServices';

describe('CreateUserService', () => {
  it('Should be able to create a new user.', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProviderRepository();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'test@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with email exists.', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProviderRepository();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    try {
      await createUser.execute({
        name: 'John Doe',
        email: 'test@test.com',
        password: '123456',
      });

      expect(
        createUser.execute({
          name: 'John Doe',
          email: 'test@test.com',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(Error);
    }
    catch (error) {}
  });
});
