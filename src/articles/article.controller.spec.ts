import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { FakeArticleRepository } from './fake-article-repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Article } from './article.entity';
import { Cache } from 'cache-manager';
import { User } from 'src/users/user.entity';
import { UpdateArticleDto } from './dto/update-article.dto';

describe('ArticleService', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        JwtService,
        ArticleService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Article),
          useClass: FakeArticleRepository,
        },
      ],
    }).compile();

    articleController = module.get<ArticleController>(ArticleController);
    articleService = module.get<ArticleService>(ArticleService);
  });

  it('должен получить статью по идентификатору с учетом связной таблицы', async () => {
    // Предположим, что ваша служба возвращает такой ответ при запросе статьи с id 1
    const expectedResponse = {
      id: 1,
      title: 'Article title',
      description: 'Article description',
      createdAt: '2024-02-14T23:36:28.542Z',
      author: {
        id: 8,
        email: '1@1.ru',
        password:
          '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
        name: 'Igor',
      },
    };

    // Мокаем метод getArticleById вашей службы
    jest
      .spyOn(articleService, 'getArticleById')
      .mockImplementation(async (id: number) => {
        if (id === 1) {
          return Promise.resolve(expectedResponse);
        }
        return Promise.resolve(null); // Возвращаем null для других случаев, если это не id 1
      });

    // Запрос статьи с id 1 через контроллер
    const id = 1;
    const article = await articleController.getArticleById(id);

    // Ожидаем, что полученный ответ соответствует ожидаемому ответу
    expect(article).toEqual(expectedResponse);

    // Ожидаем, что метод getArticleById был вызван с правильным id
    expect(articleService.getArticleById).toHaveBeenCalledWith(id);
  });

  it('должен получить статью по идентификатору с учетом связной таблицы', async () => {
    // Предположим, что ваша служба возвращает такой ответ при запросе статьи с id 1

    const now = new Date();
    const expectedResponse = {
      message: 'Article not found with id 2222 ',
      error: 'Not Found',
      statusCode: 404,
    };

    // Мокаем метод getArticleById вашей службы
    jest
      .spyOn(articleService, 'getArticleById')
      .mockImplementation(async (id: number) => {
        if (id === 111) {
          return Promise.resolve(expectedResponse);
        }
        return Promise.resolve(null); // Возвращаем null для других случаев, если это не id 1
      });

    // Запрос статьи с id 1 через контроллер
    const id = 111;
    const article = await articleController.getArticleById(id);

    // Ожидаем, что полученный ответ соответствует ожидаемому ответу
    expect(article).toEqual(expectedResponse);

    // Ожидаем, что метод getArticleById был вызван с несуществующим id
    expect(articleService.getArticleById).toHaveBeenCalledWith(id);
  });
});
