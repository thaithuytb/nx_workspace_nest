import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @MaxLength(15)
  @IsAlphanumeric()
  @ApiProperty()
  @IsOptional()
  username: string;

  @MinLength(6)
  @IsAlphanumeric()
  @ApiProperty()
  @IsOptional()
  password: string;

  @MinLength(2)
  @ApiProperty()
  @IsAlpha()
  @IsOptional()
  firstName: string;

  @MinLength(2)
  @ApiProperty()
  @IsAlpha()
  @IsOptional()
  lastName: string;

  @MinLength(2)
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber('VN')
  @MinLength(5)
  @ApiProperty()
  @IsOptional()
  phone: string;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  userStatus: number;
}
