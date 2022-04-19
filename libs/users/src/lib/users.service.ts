import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { dataUser } from './mockData';

@Injectable()
export class UsersService {
  private readonly users: User[] = [...dataUser];

  findAllUsers(): User[] {
    return this.users;
  }

  findUserById(id: number): User {
    return this.users.find((user) => {
      return user.id === id;
    });
  }
}
