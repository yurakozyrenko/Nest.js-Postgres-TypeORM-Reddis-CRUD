import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizeResponse {
  @ApiProperty({ example: 'User Unauthorized' })
  message: string;
  @ApiProperty({ default: 401 })
  statusCode: number;
}

export class UnauthorizeUserResponse {
  @ApiProperty({ example: 'Error email or password' })
  message: string;
  @ApiProperty({ default: 401 })
  statusCode: number;
}

export class TokenResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpZCI6MTAsImlhdCI6MTcwODA4NzIyMSwiZXhwIjoxNzA4MTczNjIxfQ.VwtAK8AtdgQd6ZaBN5mdcKx-GUmhcEqi2fC_DG1vBS2',
  })
  token: string;
}

export class NotFoundResponseArticle {
  @ApiProperty({ default: `Article not found with id` })
  message: string;
  @ApiProperty({ default: 'Not Found' })
  error: string;
  @ApiProperty({ default: 404 })
  statusCode: number;
}

export class NotFoundResponseUser {
  @ApiProperty({ default: 'User already exists' })
  message: string;
  @ApiProperty({ default: 'Not Found' })
  error: string;
  @ApiProperty({ default: 404 })
  statusCode: number;
}

export class ArticleResponse {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ default: 'Title Article' })
  title: string;
  @ApiProperty({ default: 'Article description' })
  description: string;
  @ApiProperty({
    example: {
      id: 10,
    },
  })
  author: string;
  @ApiProperty({ default: '2024-02-14T23:36:28.542Z' })
  createdAt: Date;
}

export class BadResponseUser {
  @ApiProperty()
  message: string;
  @ApiProperty({ default: 'Bad Request' })
  error: string;
  @ApiProperty({ default: 400 })
  statusCode: number;
}
