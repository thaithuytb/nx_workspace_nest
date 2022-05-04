import { BadRequestException } from '@nestjs/common';
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

  describe('should be created an user', () => {
    it('create an user with correct paramaters', () => {
       //input
      const mockUser: CreateUserDto = {
        username: 'Thai ngo',
        password: '123456'
      }
      //output
      const newUser = new UserEntity();

      const mockSpyOn = jest.spyOn(service, 'createUser').mockImplementation(() => ({
        ...newUser,
        ...mockUser
      }));

      expect(controller.createUser(mockUser)).toMatchObject({
        ...newUser,
        ...mockUser
      });
      expect(mockSpyOn).toBeCalledWith(mockUser);

    });
    it('throws an error when no username is provided', async () => {
      const mockUserNoUsername = {
        username: '',
        password: '123456'
      };
      try {
        await expect(controller.createUser(mockUserNoUsername));
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe("username must contain only letters and numbers");
      }
    });
    it('throws an error when username already exists', () => {
      console.log('abc')
    });
  });
});
