import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './bookingStatus.hooks';
import { apply_Methods } from './bookingStatus.methods';
import { apply_Statics } from './bookingStatus.statics';
import { apply_Virtuals } from './bookingStatus.virtuals';
import { apply_Indexes } from './bookingStatus.indexes';


interface IBookingStatus_Statics {

}

interface IBookingStatus_Methods {

}

interface IBookingStatus_Virtuals {

}

export type BookingStatusDocument = BookingStatus & Document & IBookingStatus_Methods & IBookingStatus_Virtuals;



@Schema({ collection: 'bookingStatuses', timestamps: true })
export class BookingStatus {
    @Prop({ type: Number, required: true })
    _id?: number;

    @Prop({ required: true })
    name: string;
}



type BookingStatusModel = Model<BookingStatusDocument> & IBookingStatus_Statics;
const BookingStatusSchema = SchemaFactory.createForClass(BookingStatus);

// Apply hooks
apply_PreHooks(BookingStatusSchema);
apply_PostHooks(BookingStatusSchema);

// Apply methods
apply_Methods(BookingStatusSchema);

// Apply statics
apply_Statics(BookingStatusSchema);

// Apply virtuals
apply_Virtuals(BookingStatusSchema);

// Apply indexes
apply_Indexes(BookingStatusSchema);

export { BookingStatusSchema, BookingStatusModel }  