import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdatePasswordDto } from './dto/user-update-password.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserReturnDto } from './dto/user-return.dto';
import * as bcrypt from 'bcrypt';
import { UserDeleteDto } from './dto/user-delete.dto';
import { UserMailDto } from './dto/user-mail.dto';
import * as nodemailer from 'nodemailer';
import { UserActivateDto } from './dto/user-activate.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //---- Start of task functions ----//
  hashGenerator(value: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(value, salt);
  }

  async checkIfUserExistUsingEmail(email: string) {
    const userFindAll = await this.userRepository.find();
    const users = [];
    if (userFindAll !== undefined) {
      for (const element in userFindAll) {
        users.push(await this.userRepository.findOne(userFindAll[element].id));
      }
    }
    for (const element of users) {
      if (element.email === email) {
        return element;
      }
    }
    return false;
  }

  async checkIfUserCanLogin(email: string, password: string) {
    const user = await this.checkIfUserExistUsingEmail(email);

    return user !== false //&& user.active === true
      ? bcrypt.compareSync(password, user.password)
      : false;
  }
  //---- End of task functions ----//

  async sendMail(userMailDto: UserMailDto) {
    const { email, url } = userMailDto;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'homerowork22@gmail.com',
        pass: '',
      },
    });

    try {
      await transporter.sendMail({
        from: '"Validate User" <homerowork22@gmail.com>',
        to: email,
        subject: 'Validate User',
        html: `
          <b>Por favor haz click en el enlace!</b>
          <br>
          <a href="${url}">Verificar mail</a>
          `,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async create(userCreateDto: UserCreateDto): Promise<UserReturnDto> {
    if (
      (await this.checkIfUserExistUsingEmail(userCreateDto.email)) === false
    ) {
      const userCreate = this.userRepository.create();
      userCreate.name = userCreateDto.name;
      userCreate.email = userCreateDto.email;
      userCreate.password = this.hashGenerator(userCreateDto.password);
      userCreate.active = false;

      const userCreated = await this.userRepository.save(userCreate);

      if (userCreated) {
        return await this.findOne(userCreated.id);
      } else {
        throw new ConflictException(
          `Could not create the user: ${userCreateDto.name}`,
        );
      }
    } else {
      throw new ConflictException(
        'The user may already exist, check the email',
      );
    }
  }

  async findAll(): Promise<UserReturnDto[]> {
    const userFindAll = await this.userRepository.find();
    const userReturn = [];
    if (userFindAll !== undefined) {
      for (const element in userFindAll) {
        userReturn.push(await this.findOne(userFindAll[element].id));
      }
      return userReturn;
    } else {
      throw new ConflictException('Users Not found');
    }
  }

  async findOne(id: number): Promise<UserReturnDto> {
    const user = await this.userRepository.findOne(id);

    if (user !== undefined) {
      const userReturn = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      return userReturn;
    } else {
      throw new NotFoundException('User Not found, please check de key');
    }
  }

  async update(
    id: number,
    userUpdateDto: UserUpdateDto,
  ): Promise<UserReturnDto> {
    const user = await this.userRepository.findOne(id);

    if (user) {
      user.name = userUpdateDto.name;
      const userUpdated = await this.userRepository.save(user);

      if (userUpdated) {
        return await this.findOne(id);
      } else {
        throw new BadRequestException('Could not update the user');
      }
    } else {
      throw new NotFoundException();
    }
  }

  async updatePassword(
    userUpdatePasswordDto: UserUpdatePasswordDto,
  ): Promise<UserReturnDto> {
    const user = await this.checkIfUserExistUsingEmail(
      userUpdatePasswordDto.email,
    );
    if (user !== false) {
      user.password = this.hashGenerator(userUpdatePasswordDto.password);
      if (this.userRepository.save(user)) {
        return await this.findOne(user.id);
      }
    } else {
      throw new NotFoundException(
        'User Not found, please check de key and name',
      );
    }
  }

  async activateUser(userActivateDto: UserActivateDto) {
    const user = await this.checkIfUserExistUsingEmail(userActivateDto.email);
    if (user != false) {
      user.active = true;
      const userUpdated = await this.userRepository.save(user);

      if (userUpdated) {
        return await this.findOne(user.id);
      } else {
        throw new BadRequestException('Could not update the user');
      }
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number, userDeleteDto: UserDeleteDto): Promise<void> {
    const userRemove = await this.checkIfUserExistUsingEmail(
      userDeleteDto.email,
    );

    if (userRemove !== false && userRemove.id == id) {
      await this.userRepository.delete(id);
    } else {
      throw new NotFoundException('User Not found, please check de key');
    }
  }
}
