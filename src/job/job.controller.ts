import { Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobsService: JobService) {}

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('stadistics')
  findTopFiveCompanies() {
    return this.jobsService.findTopFiveCompanies();
  }
}
