import { Injectable } from '@nestjs/common';
import { dataUser } from './mockData';
import { CreateUserDto } from './dto/user-create.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  readonly users: User[] = [...dataUser];
  //--------------GET USER ----------------//
  getUser( username?: string, id?: string): User {
    if(!id) return this.users.find((user) => user.username === username) ;
    if (!username) return this.users.find((user) => user.id === +id);
    return this.users.find((user) => (user.id === +id && user.username === username));
  }
  //--------------DELETE USER ----------------//
  deleteUser(username: string): User | null {
    const checkUser = this.users.find((user) => user.username === username);
    if (checkUser) {
      this.users.splice(checkUser.id, 1);
      return checkUser;
    }
    return null;
  }
  //--------------CREATE USER ----------------//
  createUser(createUserDto: CreateUserDto): User | null {
    const checkUser = this.users.find(
      (user) => user.username === createUserDto.username
    );
    if (!checkUser) {
      const newUser = {
        ...createUserDto,
        id: this.users.length
      };
      this.users.push(newUser);
      return newUser;
    }
    return null;
  }
  //--------------UPDATE USER ----------------//
  updateUser(username: string, updateUser: CreateUserDto): User | null {
    const checkUser = this.users.find((user) => user.username === username);
    if (checkUser) {
      const updateUserIndex = this.users.indexOf(checkUser);
      this.users[updateUserIndex] = {...checkUser, ...updateUser};
      return {...checkUser, ...updateUser};
    }
    return null;
  }
}
