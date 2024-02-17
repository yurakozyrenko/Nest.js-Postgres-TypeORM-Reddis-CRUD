import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Pagination } from '../components/pagination.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { User } from '../users/user.entity';
import { AuthUser } from '../users/user.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { Article } from './article.entity';
import {
  ArticleResponse,
  BadResponseUser,
  NotFoundResponseArticle,
  UnauthorizeResponse,
} from '../types/type';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  //Get All Articles
  @ApiOperation({ summary: 'Get All Articles' })
  @ApiResponse({ status: 200, type: [Article], description: 'Articles' })
  @ApiResponse({
    status: 400,
    type: BadResponseUser,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get()
  @HttpCode(200)
  async getAllArticles(@Pagination() pagination, @Query() filters?: any) {
    const result = await this.articleService.getAllArticles(
      pagination,
      filters,
    );
    return result[0];
  }

  //Get  Article by id
  @ApiOperation({ summary: 'Get  Article by id' })
  @ApiResponse({ status: 200, type: [Article], description: 'Article' })
  @ApiResponse({
    status: 400,
    type: BadResponseUser,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundResponseArticle,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get(':id')
  @HttpCode(200)
  async getArticleById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.articleService.getArticleById(id);
    return result;
  }

  //CREATE
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Article' })
  @ApiBody({ type: CreateArticleDto })
  @ApiResponse({ status: 201, type: ArticleResponse, description: 'Article' })
  @ApiResponse({
    status: 400,
    type: BadResponseUser,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'User Unauthorized',
    type: UnauthorizeResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @UsePipes(ValidationPipe)
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async createArticle(
    @AuthUser() user: User,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    const userId = user.id;

    const result = await this.articleService.createArticle(
      createArticleDto,
      userId,
    );
    return result;
  }

  //UPDATE
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Article' })
  @ApiBody({ type: CreateArticleDto })
  @ApiResponse({ status: 200, type: Article, description: 'Article' })
  @ApiResponse({
    status: 400,
    type: BadResponseUser,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'User Unauthorized',
    type: UnauthorizeResponse,
  })
  @ApiResponse({
    status: 404,
    type: NotFoundResponseArticle,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @UsePipes(ValidationPipe)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const result = await this.articleService.updateArticle(
      id,
      updateArticleDto,
    );
    return result;
  }

  //DELETE
  @ApiOperation({ summary: 'Delete Article' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Article deleted successfully' })
  @ApiResponse({
    status: 400,
    type: BadResponseUser,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'User Unauthorized',
    type: UnauthorizeResponse,
  })
  @ApiResponse({
    status: 404,
    type: NotFoundResponseArticle,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteArticle(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const result = await this.articleService.deleteArticle(id);
    return result;
  }
}
