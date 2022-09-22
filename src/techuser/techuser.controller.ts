import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BearerAuthGuard } from 'src/user/decorator/bearer-auth.guard';
import { TechuserService } from './techuser.service';

@Controller('techuser')
export class TechuserController {
  constructor(private readonly techuserService: TechuserService) {}

  @Post()
  @UseGuards(BearerAuthGuard)
  create(@Body() techuser) {
    return this.techuserService.create(techuser);
  }

  @Post('/gettech')
  @UseGuards(BearerAuthGuard)
  findAll(@Body() email) {
    return this.techuserService.findAll(email);
  }
}
