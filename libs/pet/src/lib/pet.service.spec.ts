import { Test } from '@nestjs/testing';
import { PetService } from './pet.service';

describe('PetService', () => {
  let service: PetService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PetService],
    }).compile();

    service = module.get(PetService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
