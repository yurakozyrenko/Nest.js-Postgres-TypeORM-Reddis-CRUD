import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Do not empty title' })
  @IsString({ message: 'Please, enter title' })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Do not empty description' })
  @IsString({ message: 'Please, enter description' })
  description?: string;
}
