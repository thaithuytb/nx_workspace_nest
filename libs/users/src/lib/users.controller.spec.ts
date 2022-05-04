import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/user-create.dto';
import { UserEntity } from './interfaces/userEntity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsernameDto } from './dto/username-param.dto';

describe('UsersController', () => {
  //setup
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService],
      controllers: [UsersController],
    }).compile();

    controller = module.get(UsersController);
    service = module.get(UsersService);
  });

  describe('should be created an user', () => {
    it('create an user with correct paramaters', () => {
      //input
      const mockUser: CreateUserDto = {
        username: 'Thai ngo',
        password: '123456',
      };
      //output
      const newUser = new UserEntity();

      const mockSpyOn = jest
        .spyOn(service, 'createUser')
        .mockImplementation(() => ({
          ...newUser,
          ...mockUser,
        }));

      expect(controller.createUser(mockUser)).toMatchObject({
        ...newUser,
        ...mockUser,
      });
      expect(mockSpyOn).toBeCalledWith(mockUser);
    });
    it('throws an error when no username is provided', async () => {
      const mockUserNoUsername = {
        username: '',
        password: '123456',
      };
      try {
        await expect(controller.createUser(mockUserNoUsername));
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(
          'username must contain only letters and numbers'
        );
      }
    });
    it('throws an error when username already exists', () => {
      console.log('abc');
    });
  });

  describe('Get an user', () => {
    it('get an user by username', () => {
      const username = new UsernameDto();
      const mockUser = new UserEntity();

      const userServiceGetUserByUsernameSpy = jest
        .spyOn(service, 'findUserByUsername')
        .mockImplementation(() => mockUser);

      controller.getUserByUsername(username);
      expect(userServiceGetUserByUsernameSpy).toBeCalledWith(username.username);
      expect(controller.getUserByUsername(username)).toBe(mockUser);
    });
    it('Throw an exeption if the username provided is not found', () => {
      const username = new UsernameDto();

      const userServiceGetUserByUsernameSpy = jest
        .spyOn(service, 'findUserById')
        .mockImplementation(() => undefined);

      try {
        controller.getUserByUsername(username);
        expect(userServiceGetUserByUsernameSpy).toBeCalledWith(username);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('Update an user', () => {
    it('update an user by username and user object in body of the request', () => {
      const username = 'user123abc';
      const mockUser = new UserEntity();
      const updateUserDto = new CreateUserDto();
      const userServiceUpdateUserByUsernameSpy = jest
        .spyOn(service, 'updateUser')
        .mockImplementation(() => mockUser);

      controller.putUserByUsername(updateUserDto, username);
      expect(userServiceUpdateUserByUsernameSpy).toBeCalledWith(
        username,
        updateUserDto
      );
      expect(controller.putUserByUsername(updateUserDto, username)).toBe(
        mockUser
      );
    });
    it('Throw an exeption if the username provided is not found', () => {
      const username = 'user123abc';
      const updateUserDto = new CreateUserDto();
      const userServiceUpdateUserByUsernameSpy = jest
        .spyOn(service, 'updateUser')
        .mockImplementation(() => null);

      try {
        controller.putUserByUsername(updateUserDto, username);
        expect(userServiceUpdateUserByUsernameSpy).toBeCalledWith(
          updateUserDto,
          username
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('Delete an user', () => {
    it('delete an user by username', () => {
      //input
      const username = 'user123abc';
      //mock output
      const mockUser = new UserEntity();

      const userServiceDeleteUserByUsernameSpy = jest
        .spyOn(service, 'deleteUserByUsername')
        .mockImplementation(() => mockUser);

      controller.deleteUserByUsername(username);
      expect(userServiceDeleteUserByUsernameSpy).toBeCalledWith(username);
      expect(controller.deleteUserByUsername(username)).toBe(HttpStatus.OK);
    });
    it('Throw an exeption if the username provided is not found', () => {
      const username = 'user123abc';

      const userServiceDeleteUserByUsernameSpy = jest
        .spyOn(service, 'deleteUserByUsername')
        .mockImplementation(() => null);

      try {
        controller.deleteUserByUsername(username);
        expect(userServiceDeleteUserByUsernameSpy).toBeCalledWith(username);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
