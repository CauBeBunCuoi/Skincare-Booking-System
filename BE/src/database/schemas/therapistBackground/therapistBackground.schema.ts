import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './therapistBackground.hooks';
import { apply_Methods } from './therapistBackground.methods';
import { apply_Statics } from './therapistBackground.statics';
import { apply_Virtuals } from './therapistBackground.virtuals';
import { apply_Indexes } from './therapistBackground.indexes';


interface ITherapistBackground_Statics {

}

interface ITherapistBackground_Methods {

}

interface ITherapistBackground_Virtuals {

}

export type TherapistBackgroundDocument = TherapistBackground & Document & ITherapistBackground_Methods & ITherapistBackground_Virtuals;  



@Schema({ collection: 'therapistBackgrounds', timestamps: true })
export class TherapistBackground {
    _id?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Account', required: true })
    accountId: Types.ObjectId;
  
    @Prop()
    description: string;
}



type TherapistBackgroundModel = Model<TherapistBackgroundDocument> & ITherapistBackground_Statics; 
const TherapistBackgroundSchema = SchemaFactory.createForClass(TherapistBackground);

// Apply hooks
apply_PreHooks(TherapistBackgroundSchema);
apply_PostHooks(TherapistBackgroundSchema);

// Apply methods
apply_Methods(TherapistBackgroundSchema);

// Apply statics
apply_Statics(TherapistBackgroundSchema);

// Apply virtuals
apply_Virtuals(TherapistBackgroundSchema);

// Apply indexes
apply_Indexes(TherapistBackgroundSchema);

export {TherapistBackgroundSchema, TherapistBackgroundModel}  