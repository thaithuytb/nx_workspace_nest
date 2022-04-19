import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username:	string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName:	string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  userStatus: number;
}
