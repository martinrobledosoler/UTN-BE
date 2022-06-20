import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthValidateTokenDto } from './dto/auth-validate-token.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('/validate')
  validateToken(@Body() authValidateToken: AuthValidateTokenDto) {
    return this.authService.validateToken(authValidateToken);
  }
}
