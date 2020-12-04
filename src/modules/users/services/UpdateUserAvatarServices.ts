import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarServices {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {

    const user = await this.userRepository.findByID(user_id);
    if (!user)
      throw new Error('Only authenticated users can change avatar');

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
      // const userAvatarFilePath = path.join(uploadConfig.tmpFolder, user.avatar);
      // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // if (userAvatarFileExists) {
      //   await fs.promises.unlink(userAvatarFilePath);
      // }
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = avatarFilename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarServices;
