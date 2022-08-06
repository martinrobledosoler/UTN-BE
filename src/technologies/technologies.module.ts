import { Module } from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { BearerAuthStrategy } from 'src/user/decorator/bearer-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technologies } from 'src/entities/technologies.entity';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Technologies])],
  providers: [TechnologiesService, BearerAuthStrategy],
  controllers: [TechnologiesController],
  exports: [TechnologiesService],
})
export class TechnologiesModule {}
