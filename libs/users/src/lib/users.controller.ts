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
import { CreateUserDto } from './dto/createUserDto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersSerive: UsersService) {}

  // --------------------------------------------------------

  @ApiOperation({
    summary: 'Creates list of array with given input array',
  })
  @ApiBody({
    type: [CreateUserDto],
    description: 'List of user object',
  })
  @ApiBody({
    description: 'Created list of user Object',
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    description: 'User created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid user supplied',
  })
  @Post('createWithArray')
  createUserWithArray(@Body() body: CreateUserDto[]) {
    return `Create users by array ${body}`;
  }
  // --------------------------------------------------------
  @ApiOperation({
    summary: 'Get an user by username',
  })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'The name that needs to be fetched',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid username supplied',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get(':username')
  getUserByUsername(@Param() params) {
    return `Get user by username ${params.username}`;
  }
  // --------------------------------------------------------
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'Name that needs to be updated',
  })
  @ApiBody({
    description: 'User object for update',
    type: CreateUserDto,
  })
  @ApiOkResponse({
    description: 'Updated user data',
  })
  @ApiBadRequestResponse({
    description: 'Invalid username supplied',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Put(':username')
  putUserByUsername(@Body() body: CreateUserDto, @Param() username) {
    return `user has named ${username} change === ${body}`;
  }

  // --------------------------------------------------------

  @ApiOperation({
    summary: 'Delete user by username',
  })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'The name that needs to be deleted',
  })
  @ApiOkResponse({
    description: 'Deleted user',
  })
  @ApiBadRequestResponse({
    description: 'Invalid username supplied',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Delete(':username')
  deleteUserByUsername(@Param() params) {
    return `Delete user by username ${params.username}`;
  }
  // --------------------------------------------------------
  @ApiOperation({
    summary: 'Create an user',
  })
  @ApiBody({
    description: 'Creating user object',
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    description: 'User was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid user supplied',
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
