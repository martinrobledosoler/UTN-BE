import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({ type: String, example: 'Rodolfo' })
  @IsString()
  readonly name: string;
}
