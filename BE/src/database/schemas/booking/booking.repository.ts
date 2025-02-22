import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booking, BookingModel } from "./booking.schema";
import { Types } from "mongoose";
import moment from "moment-timezone";

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: BookingModel,
  ) { }

  async findById(id: any): Promise<Booking | null> {
    return this.bookingModel.findById(id).exec();
  }

  async findByAssignedTherapistId(therapistId: Types.ObjectId): Promise<Booking[]> {
    return this.bookingModel.find({ assignedTherapistId: new Types.ObjectId(therapistId) }).exec();
  }

  async findByAccountId(accountId: Types.ObjectId): Promise<Booking[]> {
    return this.bookingModel.find({ accountId: new Types.ObjectId(accountId) }).exec();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async create(booking: Booking): Promise<Booking> {
    return this.bookingModel.create(booking);
  }

  async update(id: any, booking: Booking): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, booking, { new: true }).exec();
  }

  async assignTherapist(bookingId: Types.ObjectId, therapistId: Types.ObjectId): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(bookingId, { assignedTherapistId: new Types.ObjectId(therapistId) }).exec();
  }

  async checkInBooking(bookingId: Types.ObjectId): Promise<Booking | null> {
    const now = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DDTHH:mm:ss[Z]");
    return this.bookingModel.findByIdAndUpdate(bookingId, { checkInTime: new Date(now), bookStatusId: 4 }).exec(); 
  }

  async checkOutBooking(bookingId: Types.ObjectId): Promise<Booking | null> {
    const now = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DDTHH:mm:ss[Z]");
    return this.bookingModel.findByIdAndUpdate(bookingId, { checkOutTime: new Date(now), bookStatusId: 5 }).exec();
  }

  async delete(id: any): Promise<Booking | null> {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }

  async cancelBooking(bookingId: Types.ObjectId, cancelReason: string): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(bookingId, { cancelReason: cancelReason, bookStatusId: 7 }).exec();
  }
}