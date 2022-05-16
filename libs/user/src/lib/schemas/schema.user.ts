import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose'

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop({
    type: String,
    minlength: 4,
    maxlength: 15,
    unique: true
  })
  username: string;

  @ApiProperty()
  @Prop({
    type: Number
  })
  age: number
}

export const UserSchema = SchemaFactory.createForClass(User);

