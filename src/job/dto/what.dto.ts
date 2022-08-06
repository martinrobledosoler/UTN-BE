import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JobsWhatDto {
  @ApiProperty({ type: String, example: 'php' })
  @IsString()
  readonly what: string;
}
