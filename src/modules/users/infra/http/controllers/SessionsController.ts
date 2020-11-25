import { Request, Response} from 'express';
import { container } from 'tsyringe';
import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    // const usersRepository = new UsersRepository();
    // const authenticateUser = new AuthenticateUserServices(usersRepository);
    const authenticateUser = container.resolve(AuthenticateUserServices);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }
}
