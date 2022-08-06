import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    JobsModule,
    ConfigModule.forRoot({
      envFilePath: ['config/configuration.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'portaltrabajo',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
