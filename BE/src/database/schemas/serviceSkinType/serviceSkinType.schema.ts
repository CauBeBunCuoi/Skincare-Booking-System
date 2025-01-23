import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './serviceSkinType.hooks';
import { apply_Methods } from './serviceSkinType.methods';
import { apply_Statics } from './serviceSkinType.statics';
import { apply_Virtuals } from './serviceSkinType.virtuals';
import { apply_Indexes } from './serviceSkinType.indexes';


interface IServiceSkinType_Statics {

}

interface IServiceSkinType_Methods {

}

interface IServiceSkinType_Virtuals {

}

export type ServiceSkinTypeDocument = ServiceSkinType & Document & IServiceSkinType_Methods & IServiceSkinType_Virtuals;  



@Schema({ collection: 'serviceSkinTypes', timestamps: true })
export class ServiceSkinType {
    @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
    serviceId: Types.ObjectId;
  
    @Prop({ required: true })
    skinId: number;
}



type ServiceSkinTypeModel = Model<ServiceSkinTypeDocument> & IServiceSkinType_Statics; 
const ServiceSkinTypeSchema = SchemaFactory.createForClass(ServiceSkinType);

// Apply hooks
apply_PreHooks(ServiceSkinTypeSchema);
apply_PostHooks(ServiceSkinTypeSchema);

// Apply methods
apply_Methods(ServiceSkinTypeSchema);

// Apply statics
apply_Statics(ServiceSkinTypeSchema);

// Apply virtuals
apply_Virtuals(ServiceSkinTypeSchema);

// Apply indexes
apply_Indexes(ServiceSkinTypeSchema);

export {ServiceSkinTypeSchema, ServiceSkinTypeModel}  