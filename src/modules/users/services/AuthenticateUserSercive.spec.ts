import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProviderRepository from '../providers/HashProvider/fakes/FakeHashProvider';

import AutehnticateUserService from './AuthenticateUserServices';
import CreateUserService from './CreateUsersServices';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUserService', () => {
  it('Should be able to authenticate.', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProviderRepository();

    const authenticateUser = new AutehnticateUserService(fakeUsersRepository, fakeHashProvider);
    const user = new CreateUserService(fakeUsersRepository , fakeHashProvider);

    await user.execute({
      name: 'John Doe',
      email: 'test@test.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'test@test.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    // expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with an invalid email.', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProviderRepository();

    const authenticateUser = new AutehnticateUserService(fakeUsersRepository, fakeHashProvider);
    const user = new CreateUserService(fakeUsersRepository , fakeHashProvider);

    await user.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(authenticateUser.execute({
        email: 'johndoe2@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  })

  // it('Should not be able to authenticate with invalid password.', async () => {
  //   const fakeUsersRepository = new FakeUserRepository();
  //   const fakeHashProvider = new FakeHashProviderRepository();

  //   const authenticateUser = new AutehnticateUserService(fakeUsersRepository, fakeHashProvider);
  //   const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

  //   await createUser.execute({
  //     name: 'John Doe',
  //     email: 'test@test.com',
  //     password: '123456',
  //   });

  //   const response = await authenticateUser.execute({
  //     email: 'test@test.com',
  //     password: '12345678',
  //   });

  //   expect(response).rejects.toBeInstanceOf(Error);
  // });
});
