import { Schema, Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import mongoose, { Document, Model, model, Types } from 'mongoose';
import { IsNumber, isNumber, IsString, isString } from 'class-validator';
import { apply_PostHooks, apply_PreHooks } from './booking.hooks';
import { apply_Methods } from './booking.methods';
import { apply_Statics } from './booking.statics';
import { apply_Virtuals } from './booking.virtuals';
import { apply_Indexes } from './booking.indexes';


interface IBooking_Statics {

}

interface IBooking_Methods {

}

interface IBooking_Virtuals {

}

export type BookingDocument = Booking & Document & IBooking_Methods & IBooking_Virtuals;  



@Schema({ collection: 'bookings', timestamps: true })
export class Booking {
    @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
    serviceId: Types.ObjectId;
  
    @Prop({ required: true })
    bookStatusId: number;
  
    @Prop({ required: true })
    bookingDate: Date;
  
    @Prop({ required: true })
    appointmentTime: Date;
  
    @Prop()
    startTime: Date;
  
    @Prop()
    endTime: Date;
  
    @Prop()
    checkInTime: Date;
  
    @Prop()
    checkOutTime: Date;
  
    @Prop()
    isAssigned: boolean;
  
    @Prop({ type: Types.ObjectId, ref: 'Account' })
    assignedTherapistId: Types.ObjectId;
  
    @Prop()
    extraFee: number;
  
    @Prop()
    totalFee: number;
  
    @Prop()
    hasPaid: boolean;
  
    @Prop()
    cancelReason: string;
}



type BookingModel = Model<BookingDocument> & IBooking_Statics; 
const BookingSchema = SchemaFactory.createForClass(Booking);

// Apply hooks
apply_PreHooks(BookingSchema);
apply_PostHooks(BookingSchema);

// Apply methods
apply_Methods(BookingSchema);

// Apply statics
apply_Statics(BookingSchema);

// Apply virtuals
apply_Virtuals(BookingSchema);

// Apply indexes
apply_Indexes(BookingSchema);

export {BookingSchema, BookingModel}  