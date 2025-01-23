import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './executionResult.hooks';
import { apply_Methods } from './executionResult.methods';
import { apply_Statics } from './executionResult.statics';
import { apply_Virtuals } from './executionResult.virtuals';
import { apply_Indexes } from './executionResult.indexes';


interface IExecutionResult_Statics {

}

interface IExecutionResult_Methods {

}

interface IExecutionResult_Virtuals {

}

export type ExecutionResultDocument = ExecutionResult & Document & IExecutionResult_Methods & IExecutionResult_Virtuals;  



@Schema({ collection: 'executionResults', timestamps: true })
export class ExecutionResult {
    @Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
    bookingId: Types.ObjectId;
  
    @Prop()
    customerDescription: string;
  
    @Prop()
    treatmentDescription: string;
  
    @Prop()
    therapistRecommend: string;
}



type ExecutionResultModel = Model<ExecutionResultDocument> & IExecutionResult_Statics; 
const ExecutionResultSchema = SchemaFactory.createForClass(ExecutionResult);

// Apply hooks
apply_PreHooks(ExecutionResultSchema);
apply_PostHooks(ExecutionResultSchema);

// Apply methods
apply_Methods(ExecutionResultSchema);

// Apply statics
apply_Statics(ExecutionResultSchema);

// Apply virtuals
apply_Virtuals(ExecutionResultSchema);

// Apply indexes
apply_Indexes(ExecutionResultSchema);

export {ExecutionResultSchema, ExecutionResultModel}  