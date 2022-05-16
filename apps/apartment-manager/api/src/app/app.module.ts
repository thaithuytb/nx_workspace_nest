import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from '@aichi/room';
import { UserModule } from '@aichi/user';
import { UserModuleV2 } from '@aichi/userV2';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [RoomsModule, UserModule, MongooseModule.forRoot('mongodb://localhost/apartment')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
