import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './quizOptionService.hooks';
import { apply_Methods } from './quizOptionService.methods';
import { apply_Statics } from './quizOptionService.statics';
import { apply_Virtuals } from './quizOptionService.virtuals';
import { apply_Indexes } from './quizOptionService.indexes';


interface IQuizOptionService_Statics {

}

interface IQuizOptionService_Methods {

}

interface IQuizOptionService_Virtuals {

}

export type QuizOptionServiceDocument = QuizOptionService & Document & IQuizOptionService_Methods & IQuizOptionService_Virtuals;



@Schema({ collection: 'quizOptionServices', timestamps: true })
export class QuizOptionService {
    _id?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'QuizOption', required: true })
    quizOptionId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
    serviceId: Types.ObjectId;
}


type QuizOptionServiceModel = Model<QuizOptionServiceDocument> & IQuizOptionService_Statics;
const QuizOptionServiceSchema = SchemaFactory.createForClass(QuizOptionService);

// Apply hooks
apply_PreHooks(QuizOptionServiceSchema);
apply_PostHooks(QuizOptionServiceSchema);

// Apply methods
apply_Methods(QuizOptionServiceSchema);

// Apply statics
apply_Statics(QuizOptionServiceSchema);

// Apply virtuals
apply_Virtuals(QuizOptionServiceSchema);

// Apply indexes
apply_Indexes(QuizOptionServiceSchema);

export { QuizOptionServiceSchema, QuizOptionServiceModel }  