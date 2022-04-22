/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';
import { UsersModule } from '@aichi/users';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
    .setTitle('Pet Store API')
    .setDescription('List all accessible APIs for Pet Store')
    .setVersion('1.0')
    .addTag('app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const secondOptions = new DocumentBuilder()
    .setTitle('users')
    .setDescription('Operations about user')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const userDocument = SwaggerModule.createDocument(app, secondOptions, {
    include: [UsersModule],
  });
  SwaggerModule.setup('api', app, userDocument);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
