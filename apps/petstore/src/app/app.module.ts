import { PetModule } from '@aichi/pet';
import { UsersModule } from '@aichi/users';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, PetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
