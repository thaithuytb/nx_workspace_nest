import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsInt,
} from 'class-validator';
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
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    description: 'First name of user',
    nullable: false,
    required: true,
    maxLength: 255,
  })
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({
    description: 'Last name of user',
    required: true,
    maxLength: 255,
  })
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({
    description: 'Email of user',
    required: true,
    maxLength: 255,
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of user',
    required: true,
    minLength: 8,
    maxLength: 64,
    format: 'password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Phone number of user',
    required: true,
    minLength: 8,
    maxLength: 20,
    format: 'phone',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: ' Status of user',
    required: true,
    type: 'int',
  })
  @IsInt()
  userStatus: number;
}
