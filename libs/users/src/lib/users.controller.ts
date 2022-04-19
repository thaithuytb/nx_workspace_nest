import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user-create.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(
    private usersSerive: UsersService,
  ) {}

  @ApiOperation({
    summary: 'Creates list of array with given input array'
  })
  @ApiBody({
    type: [CreateUserDto],
    description: 'List of user object'
  })
  @ApiBody({
    description: 'Created list of user Object',
    type: CreateUserDto
  })
  @ApiCreatedResponse({
    description: 'User created successfully'
  })
  @ApiBadRequestResponse({
    description: 'Invalid user supplied'
  })
  @Post('createWithArray')
  createUserWithArray(@Body() body: CreateUserDto[]) {
    return `Create users by array ${body}`;
  }
///////////////
  @ApiOperation({
    summary: 'Get user by username'
  })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'The name that needs to be fetched'
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: CreateUserDto
  })
  @ApiBadRequestResponse({
    description: 'Invalid username supplied'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  @Get(':username')
  getUserByUsername(@Param() params) {
    return `Get user by username ${params.username}`;
  }
///////////
  @ApiOperation({
    summary: 'Updated user'
  })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'Name that needs to be updated'
  })
  @ApiBody({
    description: 'Updated user object',
    type: CreateUserDto
  })
  @ApiOkResponse({
    description: 'Updated user'
  })
  @ApiBadRequestResponse({
    description: 'Invalid username supplied'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  @Put(':username')
  putUserByUsername(@Body() body: CreateUserDto, @Param() username) {
    return `user has named ${username} change === ${body}`;
  }
/////////////
  @ApiOperation({
    summary: 'Delete user by username'
  })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'The name that needs to be deleted'
  })
  @ApiOkResponse({
    description: 'Deleted user'
  })
  @ApiBadRequestResponse({
    description: 'Invalid username supplied'
  })
  @ApiNotFoundResponse({
    description: 'User not found'
  })
  @Delete(':username')
  deleteUserByUsername(@Param() params) {
    return `Delete user by username ${params.username}`;
  }
//////////////
  @ApiOperation({
    summary: 'Created user'
  })
  @ApiBody({
    description: 'Created user Object',
    type: CreateUserDto
  })
  @ApiCreatedResponse({
    description: 'User created successfully'
  })
  @ApiBadRequestResponse({
    description: 'Invalid user supplied'
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
