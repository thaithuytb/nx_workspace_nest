import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: 'thai'
  })
  @MinLength(4)
  @MaxLength(15)
  @IsAlphanumeric()
  @IsString()
  username:	string;

  @ApiProperty({
    example: 21
  })
  @IsNumber()
  age: number;
}
