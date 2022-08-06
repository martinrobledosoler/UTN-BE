import { Module } from '@nestjs/common';
import { TechuserService } from './techuser.service';
import { TechuserController } from './techuser.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechUser } from 'src/entities/tech-user.entity';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([TechUser])],
  providers: [TechuserService],
  controllers: [TechuserController],
  exports: [TechuserService],
})
export class TechuserModule {}
