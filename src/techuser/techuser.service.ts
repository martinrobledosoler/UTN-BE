import { ConflictException, Injectable } from '@nestjs/common';
import { TechUser } from 'src/entities/tech-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TechuserService {
  constructor(
    @InjectRepository(TechUser)
    private techUserRepository: Repository<TechUser>,
  ) {}

  async create(techuser) {
    const idArr = await this.checkUserTechUsingEmail(techuser.email);

    if (idArr) {
      if (this.remove(idArr)) {
        for (let technology of techuser.tech) {
          const techUserCreate = this.techUserRepository.create();
          techUserCreate.useremail = techuser.email;
          techUserCreate.technology = technology;
          await this.techUserRepository.save(techUserCreate);
        }
      }

      return `techuser created`;
    }
  }

  async checkUserTechUsingEmail(email: string) {
    const userFindAll = await this.techUserRepository.find();
    const users = [];
    const ids = [];
    if (userFindAll !== undefined) {
      for (const element in userFindAll) {
        users.push(
          await this.techUserRepository.findOne(userFindAll[element].id),
        );
      }
    }
    for (const element of users) {
      if (element.useremail === email) {
        ids.push(element.id);
      }
    }
    return ids;
  }

  async remove(id) {
    for (let i of id) {
      await this.techUserRepository.delete(id);
    }
    return true;
  }

  async findAll(email) {
    const techUserFindAll = await this.checkUserTechUsingEmail(email.email);

    const techUserReturn = [];
    if (techUserFindAll !== undefined) {
      for (const element of techUserFindAll) {
        techUserReturn.push(await this.findOne(element));
      }
      return techUserReturn;
    } else {
      throw new ConflictException('Technologies for user Not found');
    }
  }

  async findOne(id) {
    const techUser = await this.techUserRepository.findOne(+id);
    if (techUser !== undefined) {
      return techUser.technology;
    } else {
      return false;
    }
  }
}
