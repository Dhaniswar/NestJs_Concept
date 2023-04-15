import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/modules/common/interfaces';

@Injectable()
export class MailService {
  private sendgridConfig: IConfig['sendgrid'];
  constructor(
    private mailService: MailerService,
    private readonly configService: ConfigService<IConfig, true>,
  ) {
    this.sendgridConfig = this.configService.get('sendgrid', {
      infer: true,
    });
  }

  async plainTextMail(
    toEmail: string,
    subject: string,
    message: string,
  ): Promise<string> {
    console.log(
      `toEmail => ${toEmail} subject => ${subject} and message => ${message}`,
    );
    const response = await this.mailService.sendMail({
      to: toEmail,
      from: this.sendgridConfig.senderEmail,
      subject: subject,
      template: 'index',
      context: {
        message: message,
        subject: subject,
      },
    });

    return response;
  }
}
