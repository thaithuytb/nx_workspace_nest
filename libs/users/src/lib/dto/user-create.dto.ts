import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: 'thaiyyy'
  })
  @MinLength(4)
  @MaxLength(15)
  @IsAlphanumeric()
  @IsString()
  username:	string;

  @ApiProperty()
  @MinLength(6)
  @IsString()
  @IsAlphanumeric()
  password: string;
}
