import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booking, BookingModel } from "./booking.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class BookingRepository {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: BookingModel,
  ) {}

  async findById(id: any): Promise<Booking | null> {
    return this.bookingModel.findById(id).exec();
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

  async delete(id: any): Promise<Booking | null> {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }
}