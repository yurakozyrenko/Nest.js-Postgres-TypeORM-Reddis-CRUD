import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Тестовое задание BACKEND')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag(
      ' API с использованием NestJS, которое включает в себя аутентификацию, CRUD операции и кэширование данных.',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(Number(process.env.PORT));
}
bootstrap();
