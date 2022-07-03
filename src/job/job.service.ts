import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class JobService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private BASE_URL = this.configService.get<string>('ADZUNA_BASE_URL');
  private BASE_PARAMS = this.configService.get<string>('ADZUNA_BASE_PARAMS');
  private APP_ID = this.configService.get<string>('ADZUNA_ID');
  private API_KEY = this.configService.get<string>('ADZUNA_KEY');

  findAll() {
    //ver que hacer con paises(gb se deberia poder traer todos los paises) y el numero que esta en BASE_URL
    const r = this.allJobs(20);
    return r;
  }

  allJobs(page): Array<object> {
    if (page <= 0) {
      return [];
    } else {
      const arr = this.allJobs(page - 1);
      const job = this.jobRequest(page);
      arr.push(job);
      return arr;
    }
  }

  jobRequest(page: number) {
    return this.httpService
      .get(
        //${this.BASE_URL}/gb/${this.BASE_PARAMS}&app_id=${this.APP_ID}&app_key=${this.API_KEY}&content-type=application/json
        `
    http://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=51e00c5a&app_key=ea55f05fce9f19e7eca8ea512f3a236d&results_per_page=10&what=developer&content-type=application/json
    `,
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
        https://api.adzuna.com/v1/api/jobs/gb/top_companies?app_id=51e00c5a&app_key=ea55f05fce9f19e7eca8ea512f3a236d&what=developer
    `,
      )
      .pipe(
        map((response) => response.data),
        map((data) => ({ data: data })),
      );
  }
}
