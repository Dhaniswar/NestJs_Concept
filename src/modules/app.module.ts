import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/service/config.service';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { IConfig } from './common/interfaces/config.interface';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfig, true>) => {
        const { host, password, port, username, database, synchronize } =
          configService.get('database', {
            infer: true,
          });

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          synchronize,
          autoLoadEntities: true,
        } as PostgresConnectionOptions;
      },
    }),
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
