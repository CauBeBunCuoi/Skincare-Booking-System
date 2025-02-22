import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './restSchedule.hooks';
import { apply_Methods } from './restSchedule.methods';
import { apply_Statics } from './restSchedule.statics';
import { apply_Virtuals } from './restSchedule.virtuals';
import { apply_Indexes } from './restSchedule.indexes';


interface IRestSchedule_Statics {

}

interface IRestSchedule_Methods {

}

interface IRestSchedule_Virtuals {

}

export type RestScheduleDocument = RestSchedule & Document & IRestSchedule_Methods & IRestSchedule_Virtuals;  



@Schema({ collection: 'restSchedules', timestamps: true })
export class RestSchedule {
    _id?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
    accountId: Types.ObjectId;
  
    @Prop({ required: true })
    restDate: Date;
  
    @Prop({ required: true })
    workShiftId: number;
}



type RestScheduleModel = Model<RestScheduleDocument> & IRestSchedule_Statics; 
const RestScheduleSchema = SchemaFactory.createForClass(RestSchedule);

// Apply hooks
apply_PreHooks(RestScheduleSchema);
apply_PostHooks(RestScheduleSchema);

// Apply methods
apply_Methods(RestScheduleSchema);

// Apply statics
apply_Statics(RestScheduleSchema);

// Apply virtuals
apply_Virtuals(RestScheduleSchema);

// Apply indexes
apply_Indexes(RestScheduleSchema);

export {RestScheduleSchema, RestScheduleModel}  