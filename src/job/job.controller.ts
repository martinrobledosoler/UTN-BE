import { Body, Controller, Get, Query } from '@nestjs/common';
import { JobsWhatDto } from './dto/what.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobsService: JobService) {}

  @Get()
  findAll(@Query('what') what) {
    return this.jobsService.findAll(what);
  }

  @Get('stadistics')
  findTopFiveCompanies() {
    return this.jobsService.findTopFiveCompanies();
  }
  @Get('salary')
  salaryRangesForDevelopers() {
    return this.jobsService.salaryRangesForDevelopers();
  }
}
