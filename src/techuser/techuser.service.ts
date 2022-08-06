import { Injectable } from '@nestjs/common';
import { TechUser } from 'src/entities/tech-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TechuserService {
  constructor(
    @InjectRepository(TechUser)
    private technologiesRepository: Repository<TechUser>,
  ) {}
}
