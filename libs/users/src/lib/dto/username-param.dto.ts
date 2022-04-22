import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength } from "class-validator";

export class UsernameDto {
  @MaxLength(15)
  @IsAlphanumeric()
  @ApiProperty()
  username: string;
}
