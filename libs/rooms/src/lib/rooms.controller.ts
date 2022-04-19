import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Room } from './room.interface';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get(':id')
  findById(@Param() params): Room {
    const room = this.roomsService.findRoomById(Number(params.id));
    if (!room) {
      throw new NotFoundException();
    }
    return room;
  }
}
