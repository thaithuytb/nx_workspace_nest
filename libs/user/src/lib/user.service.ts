import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user-create.dto';
import { User, UserDocument } from './schemas/schema.user';

@Injectable()
export class UserService {
  //inject model
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  //--------------GET USER ----------------//
  async getUser( username: string, id: string): Promise<User> {
    try {
      if(!id) return await this.userModel.findOne({username});
      if (!username) return await this.userModel.findById({_id: id});
      return await this.userModel.findOne().and([{username}, {_id: id}]);
    } catch (error) {
      console.log(error.message);
    }
  }
  //--------------DELETE USER ----------------//
  async deleteUser(username: string): Promise<User> {
    try {
      return await this.userModel.findOneAndDelete({username});
    } catch (error) {
      console.log(error.message);
    }
  }
  //--------------CREATE USER ----------------//
   async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const checkUser = await this.userModel.findOne({username: createUserDto.username});
      if(!checkUser) {
        const newUser = new this.userModel(createUserDto)
        return newUser.save();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  //--------------UPDATE USER ----------------//
  async updateUser(username: string, userUpdate: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.findOneAndUpdate({username}, userUpdate, {new: true});
    } catch (error) {
      console.log(error.message);
    }
  }
}
