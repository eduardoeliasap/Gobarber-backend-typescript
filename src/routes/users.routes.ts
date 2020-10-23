import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import User from '../models/User';
import CreateUsersServices from '../services/CreateUsersServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpdateUserAvatarServices from '../services/UpdateUserAvatarServices';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (req, res) => {
  const usersRepository = getRepository(User);
  const user = await usersRepository.find();

  return res.json(user);
});

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUsersServices();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.send(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    // console.log(req.file); // req.file.size contain the file size for validation

    try {
      const updateUserAvatar = new UpdateUserAvatarServices();

      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFilename: req.file.filename,
      });

      delete user.password;

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ err: err.message });
    }
  }
);

export default usersRouter;
