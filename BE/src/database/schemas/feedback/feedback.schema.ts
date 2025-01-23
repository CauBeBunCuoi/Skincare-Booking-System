import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './feedback.hooks';
import { apply_Methods } from './feedback.methods';
import { apply_Statics } from './feedback.statics';
import { apply_Virtuals } from './feedback.virtuals';
import { apply_Indexes } from './feedback.indexes';


interface IFeedback_Statics {

}

interface IFeedback_Methods {

}

interface IFeedback_Virtuals {

}

export type FeedbackDocument = Feedback & Document & IFeedback_Methods & IFeedback_Virtuals;  



@Schema({ collection: 'feedbacks', timestamps: true })
export class Feedback {
    @Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
    bookingId: Types.ObjectId;
  
    @Prop()
    feedbackContent: string;
  
    @Prop()
    rate: number;
}



type FeedbackModel = Model<FeedbackDocument> & IFeedback_Statics; 
const FeedbackSchema = SchemaFactory.createForClass(Feedback);

// Apply hooks
apply_PreHooks(FeedbackSchema);
apply_PostHooks(FeedbackSchema);

// Apply methods
apply_Methods(FeedbackSchema);

// Apply statics
apply_Statics(FeedbackSchema);

// Apply virtuals
apply_Virtuals(FeedbackSchema);

// Apply indexes
apply_Indexes(FeedbackSchema);

export {FeedbackSchema, FeedbackModel}  