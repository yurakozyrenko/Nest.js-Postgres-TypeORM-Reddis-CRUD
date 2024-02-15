import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Article]),
    forwardRef(() => AuthModule),
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
