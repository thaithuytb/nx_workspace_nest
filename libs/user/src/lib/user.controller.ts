import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsernameDto } from './dto/user-paramUserByUsername';
import { ApiResponse } from './interfaces/apiResponse';
import { CreateUserDto } from './dto/user-create.dto';
import { User } from './schemas/schema.user';

@Controller({
  path: 'user',
  version: 'v1'
})
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}
  //----------------GET USER ( username or id ) ----------------------
  @ApiOperation({
    summary: 'Get an user by username or Id',
  })
  @ApiQuery({
    name: 'username',
    type: String,
    description: 'The name that you need to query user',
    required: false
  })
  @ApiQuery({
    name: 'id',
    type: String,
    description: 'The ID that you need to query user',
    required: false
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: User
  })
  @ApiBadRequestResponse({
    description: 'Invalid username or ID supplied',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get()
  async getUser(@Query('username') username?: string, @Query('id') id?: string) {
    if (!username && !id) {
      throw new BadRequestException('Username or ID is obligatory !!!');
    }
      const user = await this.userService.getUser(username, id);
      if (!user) {
        throw new NotFoundException();
      }
      return user;
  }
  // //----------------UPDATE USER ----------------------
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
    type: User
  })
  @ApiBadRequestResponse({
    description: 'Invalid username supplied',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Put(':username')
  async updateUser(@Body() body: CreateUserDto, @Param() params: UsernameDto) {
    const user = await this.userService.updateUser(params.username, body);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  // //----------------DELETE USER----------------------
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
  async deleteUser(@Param() params: UsernameDto) {
    const user = await this.userService.deleteUser(params.username);
    if (!user) {
      throw new NotFoundException();
    }
    return {
      delete: true
    };
  }
  // //----------------CREATE USER ----------------------
  @ApiOperation({
    summary: 'Create an user',
  })
  @ApiBody({
    description: 'Creating user object',
    type: CreateUserDto,
  })
  @ApiCreatedResponse({
    description: 'User was created successfully',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Invalid user supplied',
    type: ApiResponse,
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createUser = await this.userService.createUser(createUserDto);
    if (!createUser) {
      throw new BadRequestException('Invalid user supplied');
    }
    return createUser;
  }
}
