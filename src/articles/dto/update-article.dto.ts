import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleDto {
  @ApiProperty({ description: 'Article title' })
  @IsOptional()
  @IsNotEmpty({ message: 'Do not empty title' })
  @IsString({ message: 'Please, enter title' })
  title?: string;

  @ApiProperty({ description: 'Article description' })
  @IsOptional()
  @IsNotEmpty({ message: 'Do not empty description' })
  @IsString({ message: 'Please, enter description' })
  description?: string;
}
