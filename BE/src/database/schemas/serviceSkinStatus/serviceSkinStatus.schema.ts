import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './serviceSkinStatus.hooks';
import { apply_Methods } from './serviceSkinStatus.methods';
import { apply_Statics } from './serviceSkinStatus.statics';
import { apply_Virtuals } from './serviceSkinStatus.virtuals';
import { apply_Indexes } from './serviceSkinStatus.indexes';


interface IServiceSkinStatus_Statics {

}

interface IServiceSkinStatus_Methods {

}

interface IServiceSkinStatus_Virtuals {

}

export type ServiceSkinStatusDocument = ServiceSkinStatus & Document & IServiceSkinStatus_Methods & IServiceSkinStatus_Virtuals;  



@Schema({ collection: 'serviceSkinStatuses', timestamps: true })
export class ServiceSkinStatus {
    _id?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
    serviceId: Types.ObjectId;
  
    @Prop({ required: true })
    statusId: number;
}



type ServiceSkinStatusModel = Model<ServiceSkinStatusDocument> & IServiceSkinStatus_Statics; 
const ServiceSkinStatusSchema = SchemaFactory.createForClass(ServiceSkinStatus);

// Apply hooks
apply_PreHooks(ServiceSkinStatusSchema);
apply_PostHooks(ServiceSkinStatusSchema);

// Apply methods
apply_Methods(ServiceSkinStatusSchema);

// Apply statics
apply_Statics(ServiceSkinStatusSchema);

// Apply virtuals
apply_Virtuals(ServiceSkinStatusSchema);

// Apply indexes
apply_Indexes(ServiceSkinStatusSchema);

export {ServiceSkinStatusSchema, ServiceSkinStatusModel}  