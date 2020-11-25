import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUsersServices from '@modules/users/services/CreateUsersServices';
import UpdateUserAvatarServices from '@modules/users/services/UpdateUserAvatarServices';
import { getRepository } from 'typeorm';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(UsersRepository);
    const user = await usersRepository.find();

    return res.json(user);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    // const usersRepository = new UsersRepository();
    // const createUser = new CreateUsersServices(usersRepository);
    const createUser = container.resolve(CreateUsersServices);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.send(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    // console.log(req.file); // req.file.size contain the file size for validation

    // const usersRepository = new UsersRepository();
    // const updateUserAvatar = new UpdateUserAvatarServices(usersRepository);
    const updateUserAvatar = container.resolve(UpdateUserAvatarServices);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  }
}
