import { IsEmail, IsString } from 'class-validator';

export class UserMailDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly action: string;
}
