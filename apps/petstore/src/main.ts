/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   //nest version
   app.enableVersioning({
    type: VersioningType.URI,
    // defaultVersion: ['v1', 'v2'],
    prefix: '' //default v

  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3333;

  // swagger
  const firstOptions = new DocumentBuilder()
  .setTitle('PET Store')
  .setDescription('petStore')
  .setVersion('1.0')
  .build();
  const petDocument = SwaggerModule.createDocument(app, firstOptions);
  SwaggerModule.setup('api', app, petDocument);

  //validator and transformer
  app.useGlobalPipes(new ValidationPipe({
    // transform: true
  }))

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
