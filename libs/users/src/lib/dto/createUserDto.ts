import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Id of a customer',
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'Username',
    required: true,
    maxLength: 255,
  })
  username!: string;

  @ApiProperty({
    description: 'First name of user',
    nullable: false,
    required: true,
    maxLength: 255,
  })
  firstName!: string;

  @ApiProperty({
    description: 'Last name of user',
    required: true,
    maxLength: 255,
  })
  lastName!: string;

  @ApiProperty({
    description: 'Email of user',
    required: true,
    maxLength: 255,
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Password of user',
    required: true,
    minLength: 8,
    maxLength: 64,
    format: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'Phone number of user',
    required: true,
    minLength: 8,
    maxLength: 20,
    format: 'phone',
  })
  phone: string;

  @ApiProperty()
  userStatus: number;
}
