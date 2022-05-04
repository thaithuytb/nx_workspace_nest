import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { dataUser } from './mockData';
import { CreateUserDto } from './dto/user-create.dto';
import { UserEntity } from './interfaces/userEntity';

@Injectable()
export class UsersService {
  readonly users: User[] = [...dataUser];

  findUserByUsername(username: string): User {
    return this.users.find((user) => user.username === username);
  }

  deleteUserByUsername(username: string): User | null {
    const checkUser = this.users.find((user) => user.username === username);
    if (checkUser) {
      this.users.splice(checkUser.id, 1);
      return checkUser;
    }
    return null;
  }

  findUserById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User | null {
    const checkUser = this.users.find(
      (user) => user.username === createUserDto.username
    );
    if (!checkUser) {
      const newUser = new UserEntity();
      newUser.username = createUserDto.username;
      newUser.password = createUserDto.password;
      this.users.push({
        ...newUser,
      });
      return newUser;
    }
    return null;
  }

  updateUser(username: string, updateUser: CreateUserDto): User | null {
    const checkUser = this.users.find((user) => user.username === username);
    if (checkUser) {
      const updateUserIndex = this.users.indexOf(checkUser);
      this.users[updateUserIndex] = updateUser as User;
      return updateUser as User;
    }
    return null;
  }
}
