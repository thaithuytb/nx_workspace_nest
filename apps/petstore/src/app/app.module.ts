import { PetModule } from '@aichi/pet';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@aichi/user';
import { UserModuleV2 } from '@aichi/userV2';

@Module({
  imports: [PetModule, UserModule, UserModuleV2],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
