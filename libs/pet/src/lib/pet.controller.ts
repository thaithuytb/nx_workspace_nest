import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PetService } from './pet.service';
@ApiTags('pet')
@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {
  }

  @Get(':findByStatus')
  getPetByStatus(@Param() params) {
    return '';
  }
}
