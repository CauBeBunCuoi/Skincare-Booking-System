import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RestSchedule, RestScheduleModel } from "./restSchedule.schema";
import { Types } from "mongoose";

@Injectable()
export class RestScheduleRepository {
  constructor(
    @InjectModel(RestSchedule.name) private readonly restScheduleModel: RestScheduleModel,
  ) {}

  async findById(id: any): Promise<RestSchedule | null> {
    return this.restScheduleModel.findById(id).exec();
  }

  async findAll(): Promise<RestSchedule[]> {
    return this.restScheduleModel.find().exec();
  }

  async findByTherapistId(therapistId: Types.ObjectId): Promise<RestSchedule[]> {
    return this.restScheduleModel.find({ accountId: new Types.ObjectId(therapistId) }).exec();
  }

  async findByTherapistIdAndRestDateAndWorkShiftId(therapistId: Types.ObjectId, restDate: Date, workShiftId: number): Promise<RestSchedule | null> {
    return this.restScheduleModel.findOne({ accountId: new Types.ObjectId(therapistId), restDate: restDate, workShiftId: workShiftId }).exec();
  }

  async create(data: RestSchedule): Promise<RestSchedule> {
    return this.restScheduleModel.create(data);
  }

  async update(id: any, data: RestSchedule): Promise<RestSchedule | null> {
    return this.restScheduleModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: any): Promise<RestSchedule | null> {
    return this.restScheduleModel.findByIdAndDelete(id).exec();
  }
}