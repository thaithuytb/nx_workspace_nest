import { Module } from '@nestjs/common';
import { UserControllerV2 } from './user.controllerV2';
import { UserService } from './user.service';

@Module({
  controllers: [UserControllerV2],
  providers: [UserService],
  exports: [UserService],
})
export class UserModuleV2 {}
