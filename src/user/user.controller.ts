import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserReturnDto } from './dto/user-return.dto';
import { UserUpdatePasswordDto } from './dto/user-update-password.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';
import { BearerAuthGuard } from './decorator/bearer-auth.guard';
import { UserDeleteDto } from './dto/user-delete.dto';
import { UserMailDto } from './dto/user-mail.dto';
import { UserActivateDto } from './dto/user-activate.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('mail')
  @UseGuards(BearerAuthGuard)
  sendMail(@Body() userMailDto: UserMailDto): Promise<void> {
    return this.userService.sendMail(userMailDto);
  }

  @Post()
  @UseGuards(BearerAuthGuard)
  create(@Body() userCreateDto: UserCreateDto): Promise<UserReturnDto> {
    return this.userService.create(userCreateDto);
  }

  @Get()
  @UseGuards(BearerAuthGuard)
  findAll(): Promise<UserReturnDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(BearerAuthGuard)
  findOne(@Param('id') id: number): Promise<UserReturnDto> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(BearerAuthGuard)
  update(
    @Param('id') id: number,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserReturnDto> {
    return this.userService.update(id, userUpdateDto);
  }

  @Post('/updatepassword')
  @UseGuards(BearerAuthGuard)
  updatePassword(
    @Body() userUpdatePasswordDto: UserUpdatePasswordDto,
  ): Promise<UserReturnDto> {
    return this.userService.updatePassword(userUpdatePasswordDto);
  }

  @Post('/activateuser')
  @UseGuards(BearerAuthGuard)
  activateUser(
    @Body() userActivateDto: UserActivateDto,
  ): Promise<UserReturnDto> {
    return this.userService.activateUser(userActivateDto);
  }

  @Delete(':id')
  @UseGuards(BearerAuthGuard)
  @HttpCode(204)
  delete(
    @Param('id') id: number,
    @Body() userDeleteDto: UserDeleteDto,
  ): Promise<void> {
    return this.userService.remove(id, userDeleteDto);
  }
}
