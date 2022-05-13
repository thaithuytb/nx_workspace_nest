import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EventStoreDBClient } from '@eventstore/db-client';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'EVENT_STORE_CLIENT',
      useValue: EventStoreDBClient.connectionString(
        'esdb://localhost:2113?tls=false'
      ),
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
