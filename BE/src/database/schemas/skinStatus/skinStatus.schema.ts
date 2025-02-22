import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './skinStatus.hooks';
import { apply_Methods } from './skinStatus.methods';
import { apply_Statics } from './skinStatus.statics';
import { apply_Virtuals } from './skinStatus.virtuals';
import { apply_Indexes } from './skinStatus.indexes';


interface ISkinStatus_Statics {

}

interface ISkinStatus_Methods {

}

interface ISkinStatus_Virtuals {

}

export type SkinStatusDocument = SkinStatus & Document & ISkinStatus_Methods & ISkinStatus_Virtuals;



@Schema({ collection: 'skinStatuses', timestamps: true })
export class SkinStatus {
    @Prop({ type: Number, required: true })
    _id?: number;

    @Prop({ required: true })
    name: string;
}



type SkinStatusModel = Model<SkinStatusDocument> & ISkinStatus_Statics;
const SkinStatusSchema = SchemaFactory.createForClass(SkinStatus);

// Apply hooks
apply_PreHooks(SkinStatusSchema);
apply_PostHooks(SkinStatusSchema);

// Apply methods
apply_Methods(SkinStatusSchema);

// Apply statics
apply_Statics(SkinStatusSchema);

// Apply virtuals
apply_Virtuals(SkinStatusSchema);

// Apply indexes
apply_Indexes(SkinStatusSchema);

export { SkinStatusSchema, SkinStatusModel }  