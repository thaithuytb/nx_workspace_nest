import { Test } from '@nestjs/testing';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

describe('PetController', () => {
  let controller: PetController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PetService],
      controllers: [PetController],
    }).compile();

    controller = module.get(PetController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
