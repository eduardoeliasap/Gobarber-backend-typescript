import { Request, Response} from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const restPassword = container.resolve(
      ResetPasswordService,
    );

    await restPassword.execute({
      token, password,
    })

    return res.status(204).json();
  }
}
