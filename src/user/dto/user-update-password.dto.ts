import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdatePasswordDto {
  @ApiProperty({ type: String, example: 'rodolfo@mail.com' })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ type: String, example: 'rodolfo123' })
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  readonly password: string;
}
