import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BearerAuthGuard } from 'src/user/decorator/bearer-auth.guard';
import { TechnologieCreateDto } from './dto/technologie-create.dto';
import { TechnologiesService } from './technologies.service';

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Post()
  @UseGuards(BearerAuthGuard)
  create(@Body() technologieCreateDto: TechnologieCreateDto) {
    return this.technologiesService.create(technologieCreateDto);
  }

  @Get()
  @UseGuards(BearerAuthGuard)
  findAll() {
    return this.technologiesService.findAll();
  }

  @Delete(':id')
  @UseGuards(BearerAuthGuard)
  @HttpCode(204)
  delete(@Param('id') id: number) {
    return this.technologiesService.remove(id);
  }
}
