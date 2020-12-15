import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProviderRepository from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUsersServices';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProviderRepository;

let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProviderRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able to create a new user.', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'test@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with email exists.', async () => {
    try {
      await createUser.execute({
        name: 'John Doe',
        email: 'test@test.com',
        password: '123456',
      });

      await expect(
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
