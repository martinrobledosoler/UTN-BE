import { IsEmail, IsString } from 'class-validator';

export class UserReturnDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;
}
