import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { dataUser } from './mockData';
import { CreateUserDto } from './dto/user-create.dto';
import { UserEntity } from './interfaces/userEntity';
import { EventStoreDBClient, JSONEventData } from '@eventstore/db-client';

import {
  BACKWARDS,
  END,
  FORWARDS,
  jsonEvent,
  JSONEventType,
  JSONType,
  START,
  StreamNotFoundError,
} from '@eventstore/db-client';

import {
  UserCreated,
  UserUpdated,
  UserEventState,
  UserEventType,
  UserEmailUpdated,
  UserPasswordUpdated,
  UserStatusUpdated,
} from './events/user.event';
import { UpdateUserDto } from './dto/user-update.dto';
import { json } from 'stream/consumers';
// Stream with different data types.

@Injectable()
export class UsersService {
  /**
   *
   * - Overloading TS
   * - Partial keyword
   * - Đóng gói nodejs trên container
   * - Dockerhub
   */
  constructor(
    @Inject('EVENT_STORE_CLIENT') private eventStore: EventStoreDBClient
  ) {}
  readonly users: User[] = [...dataUser];

  async getUserState(username: string): Promise<User> | null {
    const user = new UserEventState();
    const userEvents = this.eventStore.readStream<UserEventType>(username, {
      direction: FORWARDS,
      fromRevision: START,
    });
    try {
      for await (const { event } of userEvents) {
        user.when(event);
      }
    } catch (error) {
      return null;
    }
    return user;
  }
  async findUserByUsername(username: string): Promise<User | null> {
    try {
      return await this.getUserState(username);
    } catch (error) {
      return null;
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
    const checkUser = await this.getUserState(createUserDto.username);

    const createUserEvent = jsonEvent<UserCreated>({
      type: 'user-created',
      data: {
        username: createUserDto.username,
        password: createUserDto.password,
      },
    });
    if (!checkUser) {
      await this.eventStore.appendToStream(createUserDto.username, [
        createUserEvent,
      ]);
      return createUserDto as User;
    }
    return null;
  }

  async updateUser(
    username: string,
    updateUser: UpdateUserDto
  ): Promise<User | null> {
    const checkUser = await this.findUserByUsername(username);
    const userEvents: any = [];
    if (updateUser.email) {
      const updateEmailEvent = jsonEvent<UserEmailUpdated>({
        type: 'user-email-updated',
        data: {
          email: updateUser.email,
        },
      });
      userEvents.push(updateEmailEvent);
    }

    if (updateUser.password) {
      const updatePasswordEvent = jsonEvent<UserPasswordUpdated>({
        type: 'user-password-updated',
        data: {
          password: updateUser.password,
        },
      });
      userEvents.push(updatePasswordEvent);
    }

    if (updateUser.userStatus) {
      const updateUserStatusEvent = jsonEvent<UserStatusUpdated>({
        type: 'user-status-updated',
        data: {
          userStatus: updateUser.userStatus,
        },
      });
      userEvents.push(updateUserStatusEvent);
    }

    const updateUserEvent = jsonEvent<UserUpdated>({
      type: 'user-updated',
      data: {
        username: updateUser.username,
        password: updateUser.password,
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
        phone: updateUser.phone,
        userStatus: updateUser.userStatus,
      },
    });
    if (!checkUser) {
      return null;
    }
    await this.eventStore.appendToStream(username, userEvents);
    return updateUser as User;
  }
}
