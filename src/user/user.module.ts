import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { BearerAuthStrategy } from './decorator/bearer-auth.strategy';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, BearerAuthStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
