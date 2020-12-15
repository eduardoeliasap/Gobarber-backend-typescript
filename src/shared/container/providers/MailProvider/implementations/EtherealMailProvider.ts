import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider'
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'
import ISendMailDTO from '../dtos/ISendMailDTO';

import { injectable, inject} from 'tsyringe';

interface Message {
  to: string;
  body: string;
}

@injectable()
class FakeMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
    ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
      });

      this.client = transporter;
    });
  }

  public async sendMail({ to, from, subject, templateData, }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
      // html: '<p><b>Hello</b> to myself!</p>'
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default FakeMailProvider;
