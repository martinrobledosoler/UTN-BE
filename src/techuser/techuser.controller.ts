import { Controller } from '@nestjs/common';
import { TechuserService } from './techuser.service';

@Controller('techuser')
export class TechuserController {
  constructor(private readonly techuserService: TechuserService) {}
}
