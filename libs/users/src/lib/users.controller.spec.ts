import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/user-create.dto';
import { UserEntity } from './interfaces/userEntity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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

  describe('Should be created an user', () => {
    it('Create an user with correct paramaters', () => {
       //input
      const mockUser: CreateUserDto = {
        username: 'Thai ngo',
        password: '123456'
      }
      //output
      const newUser = new UserEntity();
      const usersServiceSpyOn = jest.spyOn(service, 'createUser').mockImplementation(() => ({
        ...newUser,
        ...mockUser
      }));
      expect(controller.createUser(mockUser)).toMatchObject({
        ...newUser,
        ...mockUser
      });
      expect(usersServiceSpyOn).toHaveBeenCalledWith(mockUser);
    });
    it('Throws an error when username already exists', async () => {
      const mockUserNoUsername = {
        username: 'thai',
        password: '123456'
      };
      const usersServiceSpyOn = jest.spyOn(service, 'createUser').mockImplementation(() => null);
      try {
        await controller.createUser(mockUserNoUsername);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe("Invalid user supplied");
        expect(usersServiceSpyOn).toHaveBeenCalled();
      }
    });
  });
  //get user by id
  describe('Should be get user by id', () => {
    it('Throw an error when dont found user by id', async () => {
      const paramId = 2;

      const usersServiceSpyOnGetUserById = jest.spyOn(service, 'findUserById').mockImplementation(() => null)
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
      const usersServicesSpyOnGetUserById = jest.spyOn(service, 'findUserById').mockImplementation(() => user);
      expect(controller.getUserById(idCorrect)).toMatchObject(user);
      expect(usersServicesSpyOnGetUserById).toHaveBeenCalled();
    });
  })
});
