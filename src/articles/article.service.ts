import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationOptions } from '../components/pagination.decorator';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  CONFIG,
  RESPONSE_MESSAGES,
  USER_INPUT_MESSAGES,
} from 'src/constants/constants';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getAllArticles(pagination: PaginationOptions, filters?: any) {
    const { skip, take } = pagination;

    let query = this.articleRepository.createQueryBuilder('article');

    if (filters) {
      // Filter by author.
      if (filters.authorId) {
        query = query.andWhere('article.authorId = :authorId', {
          authorId: filters.authorId,
        });
      }

      // Filter by date (createdAt).
      if (filters.createdAt) {
        const createdAtDate = new Date(filters.createdAt);

        // filtering by the creation date within a day.
        const nextDay = new Date(createdAtDate);
        nextDay.setDate(createdAtDate.getDate() + 1);

        query = query.andWhere(
          'article.createdAt >= :createdAt AND article.createdAt < :nextDay',
          {
            createdAt: createdAtDate.toISOString(),
            nextDay: nextDay.toISOString(),
          },
        );
      }
    }

    const cachedValue = await this.cacheManager.get(CONFIG.CACHE_DATA);
    if (cachedValue) {
      console.log('RESPONSE from Cache');
      return cachedValue;
    }

    // adding relationships and configuring pagination settings.
    const result = await query
      .leftJoinAndSelect('article.author', 'author')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    await this.cacheManager.set(CONFIG.CACHE_DATA, result, CONFIG.CACHE_TTL);
    console.log('RESPONSE from Base');
    return result;
  }

  async getArticleById(id: number) {
    const article = await this.articleRepository.findOne({ where: { id } });

    if (!article) {
      throw new NotFoundException(
        USER_INPUT_MESSAGES.ERROR_FIND_ARTICLE,
        `${id} `,
      );
    }
    return article;
  }
  0;

  async createArticle(createArticleDto: CreateArticleDto, userId: number) {
    const validationResult =
      await this.validateCreateArticleDto(createArticleDto);
    if (validationResult !== true) {
      throw new BadRequestException(validationResult);
    }

    const article = this.articleRepository.create({
      ...createArticleDto,
      author: { id: userId },
    });
    const savedArticle = await this.articleRepository.save(article);
    return savedArticle;
  }

  async updateArticle(id: number, updateArticleDto: UpdateArticleDto) {
    const existingArticle = await this.articleRepository.findOne({
      where: { id },
    });

    if (!existingArticle) {
      throw new NotFoundException(
        USER_INPUT_MESSAGES.ERROR_FIND_ARTICLE,
        `${id} `,
      );
    }

    const validationResult =
      await this.validateUpdateArticleDto(updateArticleDto);
    if (validationResult !== true) {
      throw new BadRequestException(validationResult);
    }

    await this.articleRepository.update(id, updateArticleDto);

    //  cache invalidation for a read articles request.
    const cacheKey = CONFIG.CACHE_DATA;
    await this.cacheManager.del(cacheKey);

    return this.articleRepository.findOne({ where: { id } });
  }

  async deleteArticle(id: number) {
    const result = await this.articleRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        USER_INPUT_MESSAGES.ERROR_FIND_ARTICLE,
        `${id} `,
      );
    }

    //  cache invalidation for a read articles request.
    const cacheKey = CONFIG.CACHE_DATA;
    await this.cacheManager.del(cacheKey);
    return { success: true, message: RESPONSE_MESSAGES.DELETE_ARTICLE };
  }

  async validateCreateArticleDto(createArticleDto: CreateArticleDto) {
    const errors: string[] = [];

    if (!createArticleDto.title || createArticleDto.title.trim() === '') {
      errors.push(USER_INPUT_MESSAGES.ERROR_EMPTY_TITLE);
    }
    if (
      !createArticleDto.description ||
      createArticleDto.description.trim() === ''
    ) {
      errors.push(USER_INPUT_MESSAGES.ERROR_EMPTY_DESCRIPTION);
    }

    if (errors.length > 0) {
      return errors;
    }

    return true;
  }

  async validateUpdateArticleDto(updateArticleDto: UpdateArticleDto) {
    const errors: string[] = [];

    if (updateArticleDto.title !== undefined) {
      if (!updateArticleDto.title || updateArticleDto.title.trim() === '') {
        errors.push(USER_INPUT_MESSAGES.ERROR_EMPTY_TITLE);
      }
    }

    if (updateArticleDto.description !== undefined) {
      if (
        !updateArticleDto.description ||
        updateArticleDto.description.trim() === ''
      ) {
        errors.push(USER_INPUT_MESSAGES.ERROR_EMPTY_DESCRIPTION);
      }
    }

    if (errors.length > 0) {
      return errors;
    }

    return true;
  }
}
