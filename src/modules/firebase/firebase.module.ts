import { Module } from '@nestjs/common';
import { FirebaseController } from './controller';
import { FirebaseService } from './service';

@Module({
  imports: [],
  controllers: [FirebaseController],
  providers: [FirebaseService],
})
export class FirebaseModule {}
