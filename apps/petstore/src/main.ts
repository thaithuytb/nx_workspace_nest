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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
  .setTitle('Api app petStore')
  .setDescription('Operations about app')
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
