import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,


    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new Error('Token does not exists!');
    }

    const user = await this.userRepository.findByID(userToken?.user_id);
    if (!user) {
      throw new Error('User does not exists!');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new Error('Token expired!');
    }

    user.password = await this.hashProvider.generateHash(password);
    // user.password = password;

    await this.userRepository.save(user);

  }
}

export default ResetPasswordService;
