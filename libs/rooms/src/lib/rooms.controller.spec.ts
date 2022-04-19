import { Test } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';

describe('RoomsController', () => {
  let controller: RoomsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [RoomsController],
    }).compile();

    controller = module.get(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
