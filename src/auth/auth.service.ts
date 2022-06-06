import { ConflictException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    if (
      (await this.userService.checkIfUserCanLogin(
        authDto.email,
        authDto.password,
      )) === true
    ) {
      const payload = { email: authDto.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new ConflictException('Wrong credentials');
    }
  }

  async validateToken(token: string) {
    return this.jwtService.verify(token);
  }
}
