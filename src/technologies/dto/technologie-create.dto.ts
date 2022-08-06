import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TechnologieCreateDto {
  @ApiProperty({ type: String, example: 'sql' })
  @IsString()
  readonly name: string;
}
