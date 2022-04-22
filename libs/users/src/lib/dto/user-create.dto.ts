import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @MaxLength(15)
  @IsAlphanumeric()
  @ApiProperty()
  username:	string;

  @MinLength(6)
  @IsAlphanumeric()
  @ApiProperty()
  password: string;
}
