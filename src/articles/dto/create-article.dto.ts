import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: 'Do not empty title' })
  @IsString({ message: 'Please, enter title' })
  title: string;

  @IsNotEmpty({ message: 'Do not empty description' })
  @IsString({ message: 'Please, enter description' })
  description: string;
}
