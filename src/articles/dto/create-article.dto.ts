import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ description: 'Article title', example: 'Article title' })
  @IsNotEmpty({ message: 'Do not empty title' })
  @IsString({ message: 'Please, enter title' })
  title: string;

  @ApiProperty({
    description: 'Article description',
    example: 'Article description',
  })
  @IsNotEmpty({ message: 'Do not empty description' })
  @IsString({ message: 'Please, enter description' })
  description: string;
}
