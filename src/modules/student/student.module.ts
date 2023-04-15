import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../send_email_sendgrid/send-email-sendgrid.module';
import { StudentController } from './controller';
import { Student } from './model';
import { StudentService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), MailModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
