import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './serviceStep.hooks';
import { apply_Methods } from './serviceStep.methods';
import { apply_Statics } from './serviceStep.statics';
import { apply_Virtuals } from './serviceStep.virtuals';
import { apply_Indexes } from './serviceStep.indexes';


interface IServiceStep_Statics {

}

interface IServiceStep_Methods {

}

interface IServiceStep_Virtuals {

}

export type ServiceStepDocument = ServiceStep & Document & IServiceStep_Methods & IServiceStep_Virtuals;



@Schema({ collection: 'serviceSteps', timestamps: true })
export class ServiceStep {
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
  serviceId: Types.ObjectId;

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  stepOrder: number;

  @Prop()
  description: string;

}



type ServiceStepModel = Model<ServiceStepDocument> & IServiceStep_Statics;
const ServiceStepSchema = SchemaFactory.createForClass(ServiceStep);

// Apply hooks
apply_PreHooks(ServiceStepSchema);
apply_PostHooks(ServiceStepSchema);

// Apply methods
apply_Methods(ServiceStepSchema);

// Apply statics
apply_Statics(ServiceStepSchema);

// Apply virtuals
apply_Virtuals(ServiceStepSchema);

// Apply indexes
apply_Indexes(ServiceStepSchema);

export { ServiceStepSchema, ServiceStepModel }  