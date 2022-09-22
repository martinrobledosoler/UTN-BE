import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { JobsWhatDto } from './dto/what.dto';

@Injectable()
export class JobService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private ADZUNA_ID = this.configService.get<string>('ADZUNA_ID');
  private ADZUNA_KEY = this.configService.get<string>('ADZUNA_KEY');

  findAll(what: JobsWhatDto) {
    const res = this.jobRequestAdzuna(what);
    return res;
  }

  /*allJobs(page): Array<object> {
    if (page <= 0) {
      return [];
    } else {
      const arr = this.allJobs(page - 1);
      const job = this.jobRequest(page);
      arr.push(job);
      return arr;
    }
  }*/

  jobRequestAdzuna(what: JobsWhatDto) {
    return this.httpService
      .get(
        `https://api.adzuna.com/v1/api/jobs/gb/search/1?&results_per_page=50&content-type=application/json&app_id=${this.ADZUNA_ID}&app_key=${this.ADZUNA_KEY}&what=${what}`,
      )
      .pipe(
        map((response) => response.data),
        map((data) => ({ data: data })),
      );
  }

  findTopFiveCompanies() {
    return this.httpService
      .get(
        `
        https://api.adzuna.com/v1/api/jobs/gb/top_companies?app_id=${this.ADZUNA_ID}&app_key=${this.ADZUNA_KEY}&what=developer
    `,
      )
      .pipe(
        map((response) => response.data),
        map((data) => ({ data: data })),
      );
  }
  salaryRangesForDevelopers() {
    return this.httpService
      .get(
        `https://api.adzuna.com/v1/api/jobs/gb/histogram?app_id=51e00c5a&app_key=ea55f05fce9f19e7eca8ea512f3a236d&what=Developers
        `,
      )
      .pipe(
        map((response) => response.data),
        map((data) => ({ data: data })),
      );
  }
}
