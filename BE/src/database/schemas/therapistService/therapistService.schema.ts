import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './therapistService.hooks';
import { apply_Methods } from './therapistService.methods';
import { apply_Statics } from './therapistService.statics';
import { apply_Virtuals } from './therapistService.virtuals';
import { apply_Indexes } from './therapistService.indexes';


interface ITherapistService_Statics {

}

interface ITherapistService_Methods {

}

interface ITherapistService_Virtuals {

}

export type TherapistServiceDocument = TherapistService & Document & ITherapistService_Methods & ITherapistService_Virtuals;  



@Schema({ collection: 'therapistServices', timestamps: true })
export class TherapistService {
    @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
    accountId: Types.ObjectId;
  
    @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
    serviceId: Types.ObjectId;
  
    @Prop({ required: true })
    experienceYears: number;
}



type TherapistServiceModel = Model<TherapistServiceDocument> & ITherapistService_Statics; 
const TherapistServiceSchema = SchemaFactory.createForClass(TherapistService);

// Apply hooks
apply_PreHooks(TherapistServiceSchema);
apply_PostHooks(TherapistServiceSchema);

// Apply methods
apply_Methods(TherapistServiceSchema);

// Apply statics
apply_Statics(TherapistServiceSchema);

// Apply virtuals
apply_Virtuals(TherapistServiceSchema);

// Apply indexes
apply_Indexes(TherapistServiceSchema);

export {TherapistServiceSchema, TherapistServiceModel}  