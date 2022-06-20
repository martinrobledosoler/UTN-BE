import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthValidateTokenDto {
  @IsString()
  readonly token: string;
}
