import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/user-create.dto';
import { UserEntity } from './interfaces/userEntity';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UsernameDto } from './dto/user-paramUserByUsername';

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
//-----------------create user---------------//
  describe('Should be created an user', () => {
    it('Create an user with correct paramaters', () => {
      //input
      const mockUser: CreateUserDto = {
        username: 'Thai ngo',
        password: '123456',
      };
      //output
      const newUser = new UserEntity();
      const usersServiceSpyOn = jest
        .spyOn(service, 'createUser')
        .mockImplementation(() => ({
          ...newUser,
          ...mockUser,
        }));
      expect(controller.createUser(mockUser)).toMatchObject({
        ...newUser,
        ...mockUser,
      });
      expect(usersServiceSpyOn).toHaveBeenCalledWith(mockUser);
    });

    it('Throws an error when username already exists', async () => {
      const mockUserNoUsername = {
        username: 'thai',
        password: '123456',
      };

      const usersServiceSpyOn = jest
        .spyOn(service, 'createUser')
        .mockImplementation(() => null);

      try {
        await controller.createUser(mockUserNoUsername);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);

        expect(error.message).toBe('Invalid user supplied');

        expect(usersServiceSpyOn).toHaveBeenCalled();
      }
    });
  });
//-----------------get user by id---------------//
  describe('Should be get user by id', () => {
    it('Throw an error when dont found user by id', async () => {
      const paramId = 2;

      const usersServiceSpyOnGetUserById = jest
        .spyOn(service, 'findUserById')
        .mockImplementation(() => null);

      try {
        await controller.getUserById(paramId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);

        expect(error.message).toBe('User not found');
        expect(usersServiceSpyOnGetUserById).toHaveBeenCalledWith(paramId);
      }
    });

    it('Throw an user when found user', () => {
      const idCorrect = 1;

      const user = new UserEntity();

      const usersServicesSpyOnGetUserById = jest
        .spyOn(service, 'findUserById')
        .mockImplementation(() => user);

      expect(controller.getUserById(idCorrect)).toMatchObject(user);
      expect(usersServicesSpyOnGetUserById).toHaveBeenCalled();
    });
  });
//-----------------get user by username---------------//
  describe('Get an user by username', () => {
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
//-----------------update an user---------------//
  describe('Update an user', () => {
    it('update an user by username and user object in body of the request', () => {
      const username = 'user123abc';
      const mockUser = new UserEntity();
      const updateUserDto = new CreateUserDto();
      const userServiceUpdateUserByUsernameSpy = jest
        .spyOn(service, 'updateUser')
        .mockImplementation(() => mockUser);

      controller.updateUser(updateUserDto, username);
      expect(userServiceUpdateUserByUsernameSpy).toBeCalledWith(
        username,
        updateUserDto
      );
      expect(controller.updateUser(updateUserDto, username)).toBe(
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
        controller.updateUser(updateUserDto, username);
        expect(userServiceUpdateUserByUsernameSpy).toBeCalledWith(
          updateUserDto,
          username
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
//-----------------delete an user---------------//
  describe('Delete an user', () => {
    it('delete an user by username', () => {
      //input
      const username = 'user123abc';
      //mock output
      const mockUser = new UserEntity();

      const userServiceDeleteUserByUsernameSpy = jest
        .spyOn(service, 'deleteUserByUsername')
        .mockImplementation(() => mockUser);

      controller.deleteUser(username);
      expect(userServiceDeleteUserByUsernameSpy).toBeCalledWith(username);
      expect(controller.deleteUser(username)).toBe(HttpStatus.OK);
    });
    it('Throw an exeption if the username provided is not found', () => {
      const username = 'user123abc';

      const userServiceDeleteUserByUsernameSpy = jest
        .spyOn(service, 'deleteUserByUsername')
        .mockImplementation(() => null);

      try {
        controller.deleteUser(username);
        expect(userServiceDeleteUserByUsernameSpy).toBeCalledWith(username);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
