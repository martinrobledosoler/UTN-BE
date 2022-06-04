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
import { UserGuard } from './decorator/user.guard';
import { UserDeleteDto } from './dto/user-delete.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(UserGuard)
  create(@Body() userCreateDto: UserCreateDto): Promise<UserReturnDto> {
    return this.userService.create(userCreateDto);
  }

  @Get()
  @UseGuards(UserGuard)
  findAll(): Promise<UserReturnDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(UserGuard)
  findOne(@Param('id') id: number): Promise<UserReturnDto> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(UserGuard)
  update(
    @Param('id') id: number,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserReturnDto> {
    return this.userService.update(id, userUpdateDto);
  }

  @Put('/updatepassword/:id')
  @UseGuards(UserGuard)
  updatePassword(
    @Param('id') id: number,
    @Body() userUpdatePasswordDto: UserUpdatePasswordDto,
  ): Promise<UserReturnDto> {
    return this.userService.updatePassword(id, userUpdatePasswordDto);
  }

  @Delete(':id')
  @UseGuards(UserGuard)
  @HttpCode(204)
  delete(
    @Param('id') id: number,
    @Body() userDeleteDto: UserDeleteDto,
  ): Promise<void> {
    return this.userService.remove(id, userDeleteDto);
  }
}
