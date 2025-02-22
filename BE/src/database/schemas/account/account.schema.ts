import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsEmail, IsInt, IsNotEmpty, IsNumber, isNumber, IsOptional, IsString, isString, Matches } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './account.hooks';
import { apply_Methods } from './account.methods';
import { apply_Statics } from './account.statics';
import { apply_Virtuals } from './account.virtuals';
import { apply_Indexes } from './account.indexes';


interface IAccount_Statics {

}

interface IAccount_Methods {

}

interface IAccount_Virtuals {

}

export type AccountDocument = Account & Document & IAccount_Methods & IAccount_Virtuals;



@Schema({ collection: 'accounts', timestamps: true })
export class Account {
  _id?: Types.ObjectId;

  @Prop({ required: true, unique: true })
  @IsString()
  @IsNotEmpty({ message: 'Username must not be empty' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Username must contain only letters and numbers' })
  username: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop()
  @IsOptional()
  @IsInt({ message: 'Phone number must be an integer' })
  phoneNumber: number;

  @Prop()
  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @Prop({ required: true })
  @IsNumber({}, { message: 'Role ID must be a number' })
  @IsOptional()
  roleId: number;

  @Prop()
  @IsOptional()
  fullName: string;

  @Prop({ default: false, required: true })
  @IsOptional()
  isDeleted?: boolean;
}



type AccountModel = Model<AccountDocument> & IAccount_Statics;
const AccountSchema = SchemaFactory.createForClass(Account);

// Apply hooks
apply_PreHooks(AccountSchema);
apply_PostHooks(AccountSchema);

// Apply methods
apply_Methods(AccountSchema);

// Apply statics
apply_Statics(AccountSchema);

// Apply virtuals
apply_Virtuals(AccountSchema);

// Apply indexes
apply_Indexes(AccountSchema);

export { AccountSchema, AccountModel }  