import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
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
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  email: string;

  @Prop({ required: true })
  roleId: number;

  @Prop()
  fullName: string;
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