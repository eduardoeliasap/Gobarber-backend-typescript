import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarServices from '@modules/users/services/UpdateUserAvatarServices';

export default class UserAvatarController {
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
