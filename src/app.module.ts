import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './articles/article.module';
import { Article } from './articles/article.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { config } from 'dotenv';
import { CONFIG } from './constants/constants';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASS),
      database: process.env.DATABASE_NAME,
      entities: [Article, User],
      synchronize: false,
      autoLoadEntities: true,
    }),
    CacheModule.register({
      ttl: CONFIG.CACHE_TTL,
      store: redisStore,
      host: 'localhost', // Укажите свой хост Redis
      port: 6379, // Укажите свой порт Redis
    }),
    ArticleModule,
    UsersModule,
  ],
})
export class AppModule {}
