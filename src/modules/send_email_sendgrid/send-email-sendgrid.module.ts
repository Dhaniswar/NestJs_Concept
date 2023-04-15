import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IConfig } from '../common/interfaces';
import { MailService } from './service/send_email_sendgrid.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfig, true>) => {
        const { user, apiKey } = configService.get('sendgrid', { infer: true });

        return {
          transport: {
            host: 'smtp.sendgrid.net',
            auth: {
              user: user,
              pass: apiKey,
            },
          },
          template: {
            dir: join(__dirname, 'template'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
