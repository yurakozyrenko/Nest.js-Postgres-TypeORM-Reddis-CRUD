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
import { User } from 'src/users/user.entity';
import { AuthUser } from 'src/users/user.decorator';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @HttpCode(200)
  async getAllArticles(@Pagination() pagination, @Query() filters?: any) {
    const result = await this.articleService.getAllArticles(
      pagination,
      filters,
    );
    return result;
  }

  @Get(':id')
  @HttpCode(200)
  async getArticleById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.articleService.getArticleById(id);
    return result;
  }

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
