import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '@config/upload';

//import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUsersServices from '@modules/users/services/CreateUsersServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpdateUserAvatarServices from '@modules/users/services/UpdateUserAvatarServices';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (req, res) => {
  const usersRepository = getRepository(UsersRepository);
  const user = await usersRepository.find();

  return res.json(user);
});

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const usersRepository = new UsersRepository();
  const createUser = new CreateUsersServices(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.send(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    // console.log(req.file); // req.file.size contain the file size for validation

    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarServices(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  }
);

export default usersRouter;
