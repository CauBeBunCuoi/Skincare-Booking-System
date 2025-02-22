import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './workShift.hooks';
import { apply_Methods } from './workShift.methods';
import { apply_Statics } from './workShift.statics';
import { apply_Virtuals } from './workShift.virtuals';
import { apply_Indexes } from './workShift.indexes';


interface IWorkShift_Statics {

}

interface IWorkShift_Methods {

}

interface IWorkShift_Virtuals {

}

export type WorkShiftDocument = WorkShift & Document & IWorkShift_Methods & IWorkShift_Virtuals;



@Schema({ collection: 'workShifts', timestamps: true })
export class WorkShift {
    @Prop({ type: Number, required: true })
    _id?: number;

    @Prop({ required: true })
    startHour: string;

    @Prop({ required: true })
    endHour: string;
}



type WorkShiftModel = Model<WorkShiftDocument> & IWorkShift_Statics;
const WorkShiftSchema = SchemaFactory.createForClass(WorkShift);

// Apply hooks
apply_PreHooks(WorkShiftSchema);
apply_PostHooks(WorkShiftSchema);

// Apply methods
apply_Methods(WorkShiftSchema);

// Apply statics
apply_Statics(WorkShiftSchema);

// Apply virtuals
apply_Virtuals(WorkShiftSchema);

// Apply indexes
apply_Indexes(WorkShiftSchema);

export { WorkShiftSchema, WorkShiftModel }  