import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    return this.userService.checkIfUserCanLogin(email, password);
  }

  async validateToken(token: string) {
    return;
  }

  async login(authDto: AuthDto) {
    return;
  }
}
