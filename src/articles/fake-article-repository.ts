import { Repository, SelectQueryBuilder } from 'typeorm';
import { Article } from './article.entity';

export class FakeArticleRepository extends Repository<Article> {
  // Определите метод createQueryBuilder
  createQueryBuilder(
    alias?: string,
    queryRunner?: any,
  ): SelectQueryBuilder<Article> {
    return {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([
        {
          id: 11,
          title: '1@1.ru',
          description: '1111',
          createdAt: '2024-02-14T23:36:31.694Z',
          author: {
            id: 8,
            email: '1@1.ru',
            password:
              '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
            name: 'Igor',
          },
        },
        {
          id: 9,
          title: '1@1.ru',
          description: '1111',
          createdAt: '2024-02-14T23:36:30.966Z',
          author: {
            id: 8,
            email: '1@1.ru',
            password:
              '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
            name: 'Igor',
          },
        },
        {
          id: 8,
          title: '1@1.ru',
          description: '1111',
          createdAt: '2024-02-14T23:36:30.804Z',
          author: {
            id: 8,
            email: '1@1.ru',
            password:
              '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
            name: 'Igor',
          },
        },
        {
          id: 7,
          title: '1@1.ru',
          description: '1111',
          createdAt: '2024-02-14T23:36:30.653Z',
          author: {
            id: 8,
            email: '1@1.ru',
            password:
              '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
            name: 'Igor',
          },
        },
        {
          id: 6,
          title: '1@1.ru',
          description: '1111',
          createdAt: '2024-02-14T23:36:30.517Z',
          author: {
            id: 8,
            email: '1@1.ru',
            password:
              '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
            name: 'Igor',
          },
        },
        {
          id: 5,
          title: '1@1.ru',
          description: '1111',
          createdAt: '2024-02-14T23:36:30.350Z',
          author: {
            id: 8,
            email: '1@1.ru',
            password:
              '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
            name: 'Igor',
          },
        },
        {
          id: 4,
          title: '1@1.ru',
          description: '1111',
          createdAt: '2024-02-14T23:36:30.225Z',
          author: {
            id: 8,
            email: '1@1.ru',
            password:
              '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
            name: 'Igor',
          },
        },
        {
          id: 3,
          title: '1@1.ru',
          description: '1111',
          createdAt: '2024-02-14T23:36:30.053Z',
          author: {
            id: 8,
            email: '1@1.ru',
            password:
              '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
            name: 'Igor',
          },
        },
        {
          id: 2,
          title: '1@1.ru',
          description: '1111',
          createdAt: '2024-02-14T23:36:29.902Z',
          author: {
            id: 8,
            email: '1@1.ru',
            password:
              '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
            name: 'Igor',
          },
        },
        {
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
        },
      ]),
    } as unknown as SelectQueryBuilder<Article>;
  }

  // Мок методов, которые будут использоваться в вашем тесте
  find = jest.fn();
  findOne = jest.fn();
  save = jest.fn();
  delete = jest.fn();

  // Добавьте дополнительные методы, если это необходимо
}
