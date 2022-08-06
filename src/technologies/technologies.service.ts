import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Technologies } from 'src/entities/technologies.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnologieCreateDto } from './dto/technologie-create.dto';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technologies)
    private technologiesRepository: Repository<Technologies>,
  ) {}

  async checkIfTechExist(tech) {
    const techFindAll = await this.technologiesRepository.find();
    const technologies = [];
    if (techFindAll !== undefined) {
      for (const element in techFindAll) {
        technologies.push(
          await this.technologiesRepository.findOne(techFindAll[element].id),
        );
      }
    }
    for (const element of technologies) {
      if (element.name === tech) {
        return true;
      }
    }
    return false;
  }

  async create(technologiesCreateDto: TechnologieCreateDto) {
    if ((await this.checkIfTechExist(technologiesCreateDto.name)) === false) {
      const techCreate = this.technologiesRepository.create();
      techCreate.name = technologiesCreateDto.name;
      const techCreated = await this.technologiesRepository.save(techCreate);

      if (techCreated) {
        return `${technologiesCreateDto.name} created`;
      } else {
        throw new ConflictException(
          `Could not create the user: ${technologiesCreateDto.name}`,
        );
      }
    } else {
      throw new ConflictException('The technologie may already exist');
    }
  }

  async findAll() {
    const techFindAll = await this.technologiesRepository.find();
    const techReturn = [];
    if (techFindAll !== undefined) {
      for (const element in techFindAll) {
        techReturn.push(await this.findOne(techFindAll[element].id));
      }
      return techReturn;
    } else {
      throw new ConflictException('Technologies Not found');
    }
  }

  async findOne(id: number) {
    const tech = await this.technologiesRepository.findOne(id);
    if (tech !== undefined) {
      return tech;
    } else {
      return false;
    }
  }

  async remove(id) {
    const techRemove = await this.findOne(id);

    if (techRemove !== false) {
      await this.technologiesRepository.delete(id);
    } else {
      throw new NotFoundException('Technologie Not found');
    }
  }
}
