import { Injectable } from '@nestjs/common';
import { Room } from './room.interface';
import { dataRooms } from './room-mockData';

@Injectable()
export class RoomsService {
  private readonly rooms: Room[] = [...dataRooms];

  findRoomById(id: number): Room {
    return this.rooms.find((room) => room.id === id);
  }
}
