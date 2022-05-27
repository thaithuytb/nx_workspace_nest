import { JSONEventType } from '@eventstore/db-client';
import { User } from './../interfaces/user.interface';

export type UserUpdated = JSONEventType<
  'user-updated',
  {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userStatus: number;
  }
>;

export type UserCreated = JSONEventType<
  'user-created',
  {
    username: string;
    password: string;
  }
>;

export type UserPasswordUpdated = JSONEventType<
  'user-password-updated',
  {
    password: string;
  }
>;
export type UserEmailUpdated = JSONEventType<
  'user-email-updated',
  {
    email: string;
  }
>;
export type UserStatusUpdated = JSONEventType<
  'user-status-updated',
  {
    userStatus: number;
  }
>;

export type UserEventType =
  | UserCreated
  | UserPasswordUpdated
  | UserEmailUpdated
  | UserStatusUpdated;

export class UserEventState implements User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;

  /**
   *
   */

  when(event: UserEventType): void {
    switch (event.type) {
      case 'user-password-updated':
        this.applyPasswordEvent(event);
        break;
      case 'user-email-updated':
        this.applyEmailEvent(event);
        break;
      case 'user-status-updated':
        this.applyUserStatusEvent(event);
        break;
      case 'user-created':
        this.applyCreatedEvent(event);
        break;
    }
  }

  private applyPasswordEvent(event: UserPasswordUpdated) {
    this.password = event.data.password;
  }
  private applyEmailEvent(event: UserEmailUpdated) {
    this.email = event.data.email;
  }
  private applyUserStatusEvent(event: UserStatusUpdated) {
    this.userStatus = event.data.userStatus;
  }
  private applyCreatedEvent(event: UserCreated) {
    this.username = event.data.username;
    this.password = event.data.password;
  }
  private applyUpdatedEvent(event: UserUpdated) {
    this.username = event.data.username;
    this.password = event.data.password;
    this.firstName = event.data.firstName;
    this.email = event.data.email;
    this.phone = event.data.phone;
    this.userStatus = event.data.userStatus;
  }
}
