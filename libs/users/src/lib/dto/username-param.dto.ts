import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsAlphanumeric, IsString, MaxLength } from "class-validator";

export class UsernameDto {
  @MaxLength(15)
  @IsAlphanumeric()
  @IsString()
  @ApiProperty()
  username: string;
}
