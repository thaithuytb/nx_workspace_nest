import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsString, MaxLength } from "class-validator";

export class UsernameDto {
  @MaxLength(15)
  @IsAlphanumeric()
  @IsString()
  @ApiProperty({
    example: 'thai'
  })
  username: string;
}
