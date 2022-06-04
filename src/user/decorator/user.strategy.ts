import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super();
  }

  async validate(token: any) {
    const tokenValue = this.configService.get<string>('BEARER_TOKEN_VALUE');
    const match = bcrypt.compareSync(tokenValue, token);

    if (match) {
      return true;
    } else {
      throw new ConflictException('The bearer token doesnt match');
    }
  }
}
