import { Controller, Get, Param } from '@nestjs/common';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {
  }

  @Get(':findByStatus')
  getPetByStatus(@Param() params) {
    return '';
  }
}
