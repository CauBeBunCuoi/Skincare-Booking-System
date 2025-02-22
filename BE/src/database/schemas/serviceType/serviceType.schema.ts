import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './serviceType.hooks';
import { apply_Methods } from './serviceType.methods';
import { apply_Statics } from './serviceType.statics';
import { apply_Virtuals } from './serviceType.virtuals';
import { apply_Indexes } from './serviceType.indexes';


interface IServiceType_Statics {

}

interface IServiceType_Methods {

}

interface IServiceType_Virtuals {

}

export type ServiceTypeDocument = ServiceType & Document & IServiceType_Methods & IServiceType_Virtuals;



@Schema({ collection: 'serviceTypes', timestamps: true })
export class ServiceType {
    @Prop({ type: Number, required: true })
    _id?: number;

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;
}



type ServiceTypeModel = Model<ServiceTypeDocument> & IServiceType_Statics;
const ServiceTypeSchema = SchemaFactory.createForClass(ServiceType);

// Apply hooks
apply_PreHooks(ServiceTypeSchema);
apply_PostHooks(ServiceTypeSchema);

// Apply methods
apply_Methods(ServiceTypeSchema);

// Apply statics
apply_Statics(ServiceTypeSchema);

// Apply virtuals
apply_Virtuals(ServiceTypeSchema);

// Apply indexes
apply_Indexes(ServiceTypeSchema);

export { ServiceTypeSchema, ServiceTypeModel }  