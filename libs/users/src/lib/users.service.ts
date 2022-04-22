import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { dataUser } from './mockData';
import { CreateUserDto } from './dto/user-create.dto';
import { UserEntity } from './interfaces/userEntity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [...dataUser];

  findUserByUsername(username: string): User {
      return this.users.find((user) => user.username === username);
  }

  deleteUserByUsername(username: string): User {
    const checkUser = this.users.find((user) => user.username === username);
    if (checkUser) {
      this.users.splice(checkUser.id, 1);
      return checkUser;
    }
  }

  findUserById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  createUser( createUserDto:CreateUserDto): User {
    const checkUser = this.users.find((user) => user.username === createUserDto.username);
    if (!checkUser) {
      const newUser = new UserEntity();
      newUser.id = this.users.length;
      newUser.username = createUserDto.username;
      newUser.password = createUserDto.password;
      this.users.push({
        ...newUser,
        id: this.users.length
      })
      return newUser;
    }
  }
}
