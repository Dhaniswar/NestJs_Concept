import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './controller';
import { AuthenticationService } from './service';

@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
