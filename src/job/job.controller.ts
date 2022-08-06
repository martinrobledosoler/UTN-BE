import { Body, Controller, Get } from '@nestjs/common';
import { JobsWhatDto } from './dto/what.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobsService: JobService) {}

  @Get()
  findAll(@Body() whatDto: JobsWhatDto) {
    return this.jobsService.findAll(whatDto);
  }

  @Get('stadistics')
  findTopFiveCompanies() {
    return this.jobsService.findTopFiveCompanies();
  }
}
