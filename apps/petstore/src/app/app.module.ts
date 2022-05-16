import { PetModule } from '@aichi/pet';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@aichi/user';
import { UserModuleV2 } from '@aichi/userV2';
import {MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [PetModule, UserModule, UserModuleV2, MongooseModule.forRoot('mongodb://localhost/apartment')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
