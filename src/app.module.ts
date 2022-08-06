import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Technologies } from './entities/technologies.entity';
import { TechUser } from './entities/tech-user.entity';
import { HttpModule } from '@nestjs/axios';
import { TechnologiesModule } from './technologies/technologies.module';
import { TechuserModule } from './techuser/techuser.module';

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
      entities: [User, Technologies, TechUser],
      synchronize: true,
    }),
    TechnologiesModule,
    TechuserModule,
  ],
})
export class AppModule {}
