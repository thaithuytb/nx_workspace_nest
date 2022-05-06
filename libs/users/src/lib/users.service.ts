import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { dataUser } from './mockData';
import { CreateUserDto } from './dto/user-create.dto';
import { UserEntity } from './interfaces/userEntity';

import {
  BACKWARDS,
  END,
  FORWARDS,
  jsonEvent,
  JSONEventType,
  START,
  StreamNotFoundError,
} from '@eventstore/db-client';
import { client as eventStore } from './event-store';

type CreateUserEvent = JSONEventType<
  'create-event',
  {
    username: string;
    password: string;
  }
>;
type UpdateUserEvent = JSONEventType<
  'update-event',
  {
    username: string;
    password: string;
  }
>;

@Injectable()
export class UsersService {
  readonly users: User[] = [...dataUser];

  async findUserByUsername(username: string): Promise<User | null> {
    let user: User = new UserEntity();

    const updateEvents = eventStore.readStream<UpdateUserEvent>(username, {
      direction: BACKWARDS,
      fromRevision: END,
      maxCount: 100,
    });
    try {
      for await (const { event } of updateEvents) {
        user = event.data as User;
        return user;
      }
    } catch (error) {
      try {
        const createUserEvents = eventStore.readStream<CreateUserEvent>(
          username,
          {
            direction: BACKWARDS,
            fromRevision: END,
            maxCount: 100,
          }
        );
        for await (const { event } of createUserEvents) {
          user = event.data as User;
          return user;
        }
      } catch (error) {
        return null;
      }
    }
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

  async createUser(createUserDto: CreateUserDto): Promise<User | null> {
    const checkUser = await this.findUserByUsername(createUserDto.username);
    const createUserEvent = jsonEvent<CreateUserEvent>({
      type: 'create-event',
      data: {
        username: createUserDto.username,
        password: createUserDto.password,
      },
    });
    if (!checkUser) {
      await eventStore.appendToStream(createUserDto.username, [
        createUserEvent,
      ]);
      return createUserDto as User;
    }
    return null;
  }

  async updateUser(
    username: string,
    updateUser: CreateUserDto
  ): Promise<User | null> {
    const checkUser = await this.findUserByUsername(username);
    const updateUserEvent = jsonEvent<UpdateUserEvent>({
      type: 'update-event',
      data: {
        username: updateUser.username,
        password: updateUser.password,
      },
    });
    if (!checkUser) {
      return null;
    }
    await eventStore.appendToStream(username, [updateUserEvent]);
    return updateUser as User;
  }
}
