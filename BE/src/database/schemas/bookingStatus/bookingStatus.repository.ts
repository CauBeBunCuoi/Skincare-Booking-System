import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BookingStatus, BookingStatusModel } from "./bookingStatus.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class BookingStatusRepository {
  constructor(
    @InjectModel(BookingStatus.name) private readonly bookingStatusModel: BookingStatusModel,
  ) {}

  async findById(id: number): Promise<BookingStatus | null> {
    return this.bookingStatusModel.findById(id).exec();
  }

  async findAll(): Promise<BookingStatus[]> {
    return this.bookingStatusModel.find().exec();
  }

  async create(bookingStatus: BookingStatus): Promise<BookingStatus> {
    return this.bookingStatusModel.create(bookingStatus);
  }

  async update(id: any, bookingStatus: BookingStatus): Promise<BookingStatus | null> {
    return this.bookingStatusModel.findByIdAndUpdate(id, bookingStatus, { new: true }).exec();
  }

  async delete(id: any): Promise<BookingStatus | null> {
    return this.bookingStatusModel.findByIdAndDelete(id).exec();
  }
}