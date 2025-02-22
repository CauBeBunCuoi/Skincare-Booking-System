import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Feedback, FeedbackModel } from "./feedback.schema";
import { ObjectId, Types } from "mongoose";

@Injectable()
export class FeedbackRepository {
  constructor(
    @InjectModel(Feedback.name) private readonly feedbackModel: FeedbackModel,
  ) { }

  async findById(id: any): Promise<Feedback | null> {
    return this.feedbackModel.findById(id).exec();
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackModel.find().exec();
  }

  async findByBookingIdList( idList : Types.ObjectId[]) : Promise<Feedback[]>{
    return this.feedbackModel.find({ bookingId : {$in: idList}}).lean().exec();
  }

  async findByBookingId(bookingId: Types.ObjectId): Promise<Feedback | null> {
    return this.feedbackModel.findOne({ bookingId: new Types.ObjectId(bookingId) }).exec();
  }

  async create(feedback: Feedback): Promise<Feedback> {
    return this.feedbackModel.create(feedback);
  }

  async update(id: any, feedback: Feedback): Promise<Feedback | null> {
    return this.feedbackModel.findByIdAndUpdate(id, feedback, { new: true }).exec();
  }

  async delete(id: any): Promise<Feedback | null> {
    return this.feedbackModel.findByIdAndDelete(id).exec();
  }
}