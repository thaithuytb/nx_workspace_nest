import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsString, MaxLength, MinLength } from "class-validator";

export class UsernameDto {
  @ApiProperty({
    example: 'thai'
  })
  @MinLength(4)
  @MaxLength(15)
  @IsAlphanumeric()
  @IsString()
  username: string;
}
