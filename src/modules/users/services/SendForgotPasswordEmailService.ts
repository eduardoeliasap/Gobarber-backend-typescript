import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (!checkUserExists)
      throw new Error('Email address not exists');

    const { token } = await this.userTokensRepository.generate(checkUserExists.id);

    const templatePath = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: checkUserExists.name,
        email: checkUserExists.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: templatePath,
        variables: {
          name: checkUserExists.name,
          link: `http://localhost:3333/reset_password?token=${token}`
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService;
