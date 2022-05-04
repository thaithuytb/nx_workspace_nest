import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/createUserDto';
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
import { User } from './interfaces/user.interface';
import { UserEntity } from './interfaces/userEntity';
import { UsernameDto } from './dto/username-param.dto';
import { ApiResponse } from './interfaces/apiResponse';
import { CreateUserDto } from './dto/user-create.dto';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private usersSerive: UsersService) {}
  //----------------create user with array ----------------------
  @ApiOperation({
    summary: 'Creates list of array with given input array',
  })
  // @ApiBody({
  //   type: [CreateUserDto],
  //   description: 'List of user object',
  // })
  @ApiBody({
    description: 'Created list of user Object',
    type: [CreateUserDto],
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
  //----------------get user ----------------------
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
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'Invalid username supplied',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get(':username')
  getUserByUsername(@Param() params: UsernameDto): User {
    const user = this.usersSerive.findUserByUsername(params.username);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  //----------------update user ----------------------
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiParam({
    name: 'username',
    type: UsernameDto,
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
    const user = this.usersSerive.updateUser(username, body);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  //----------------delete user----------------------
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
  deleteUserByUsername(@Param('username') username: string) {
    const user = this.usersSerive.deleteUserByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    return HttpStatus.OK;
  }
  //----------------create user ----------------------
  @ApiOperation({
    summary: 'Create an user',
  })
  @ApiBody({
    description: 'Creating user object',
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    description: 'User was created successfully',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'Invalid user supplied',
    type: ApiResponse,
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    const createUser = this.usersSerive.createUser(createUserDto);
    if (!createUser) {
      throw new BadRequestException('Invalid user supplied');
    }
    return createUser;
  }
  //----------------get user by id ----------------------
  @ApiOperation({
    summary: 'get user by ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Id of user Object',
  })
  @ApiOkResponse({
    description: 'user Object',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'user not found',
  })
  @Get('id/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.usersSerive.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
