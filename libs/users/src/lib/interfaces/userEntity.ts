import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  firstName: string = null;

  @ApiProperty()
  lastName: string = null;

  @ApiProperty()
  email: string = null;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string = null;

  @ApiProperty()
  userStatus: number = null;
}
