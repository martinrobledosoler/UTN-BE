import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDeleteDto {
  @ApiProperty({ type: String, example: 'rodolfo@mail.com' })
  @IsString()
  @IsEmail()
  readonly email: string;
}
