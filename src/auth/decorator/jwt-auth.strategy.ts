import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_VALUE'),
    });
  }

  async validate(payload: any) {
    return { email: payload.email };
  }
}
