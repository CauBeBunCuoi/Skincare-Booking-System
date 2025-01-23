import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WorkShift, WorkShiftModel } from "./workShift.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class WorkShiftRepository {
  constructor(
    @InjectModel(WorkShift.name) private readonly workShiftModel: WorkShiftModel,
  ) {}

  async findById(id: any): Promise<WorkShift | null> {
    return this.workShiftModel.findById(id).exec();
  }

  async findAll(): Promise<WorkShift[]> {
    return this.workShiftModel.find().exec();
  }

  async create(data: WorkShift): Promise<WorkShift> {
    return this.workShiftModel.create(data);
  }

  async update(id: any, data: WorkShift): Promise<WorkShift | null> {
    return this.workShiftModel.findByIdAndUpdate(id, data, { new : true }).exec();
  }

  async delete(id: any): Promise<WorkShift | null> {
    return this.workShiftModel.findByIdAndDelete(id).exec();
  }
}