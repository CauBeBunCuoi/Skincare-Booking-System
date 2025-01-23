import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './skinType.hooks';
import { apply_Methods } from './skinType.methods';
import { apply_Statics } from './skinType.statics';
import { apply_Virtuals } from './skinType.virtuals';
import { apply_Indexes } from './skinType.indexes';


interface ISkinType_Statics {

}

interface ISkinType_Methods {

}

interface ISkinType_Virtuals {

}

export type SkinTypeDocument = SkinType & Document & ISkinType_Methods & ISkinType_Virtuals;  



@Schema({ collection: 'skinTypes', timestamps: true })
export class SkinType {
    @Prop({ required: true })
    name: string;
}



type SkinTypeModel = Model<SkinTypeDocument> & ISkinType_Statics; 
const SkinTypeSchema = SchemaFactory.createForClass(SkinType);

// Apply hooks
apply_PreHooks(SkinTypeSchema);
apply_PostHooks(SkinTypeSchema);

// Apply methods
apply_Methods(SkinTypeSchema);

// Apply statics
apply_Statics(SkinTypeSchema);

// Apply virtuals
apply_Virtuals(SkinTypeSchema);

// Apply indexes
apply_Indexes(SkinTypeSchema);

export {SkinTypeSchema, SkinTypeModel}  