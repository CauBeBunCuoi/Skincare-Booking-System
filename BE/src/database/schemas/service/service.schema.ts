import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './service.hooks';
import { apply_Methods } from './service.methods';
import { apply_Statics } from './service.statics';
import { apply_Virtuals } from './service.virtuals';
import { apply_Indexes } from './service.indexes';


interface IService_Statics {

}

interface IService_Methods {

}

interface IService_Virtuals {

}

export type ServiceDocument = Service & Document & IService_Methods & IService_Virtuals;  



@Schema({ collection: 'services', timestamps: true })
export class Service {
    @Prop({ required: true })
    serviceTypeId: number;
  
    @Prop({ required: true })
    duration: number;
  
    @Prop()
    description: string;
  
    @Prop({ required: true })
    fee: number;
}



type ServiceModel = Model<ServiceDocument> & IService_Statics; 
const ServiceSchema = SchemaFactory.createForClass(Service);

// Apply hooks
apply_PreHooks(ServiceSchema);
apply_PostHooks(ServiceSchema);

// Apply methods
apply_Methods(ServiceSchema);

// Apply statics
apply_Statics(ServiceSchema);

// Apply virtuals
apply_Virtuals(ServiceSchema);

// Apply indexes
apply_Indexes(ServiceSchema);

export {ServiceSchema, ServiceModel}  