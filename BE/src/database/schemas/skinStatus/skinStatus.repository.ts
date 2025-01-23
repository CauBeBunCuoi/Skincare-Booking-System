import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SkinStatus, SkinStatusModel } from "./skinStatus.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class SkinStatusRepository {
  constructor(
    @InjectModel(SkinStatus.name) private readonly skinStatusModel: SkinStatusModel,
  ) {}

  async findById(id: any): Promise<SkinStatus | null> {
    return this.skinStatusModel.findById(id).exec();
  }

  async findAll(): Promise<SkinStatus[]> {
    return this.skinStatusModel.find().exec();
  }

  async create(data: SkinStatus): Promise<SkinStatus> {
    return this.skinStatusModel.create(data);
  }

  async update(id: any, data: SkinStatus): Promise<SkinStatus | null> {
    return this.skinStatusModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: any): Promise<SkinStatus | null> {
    return this.skinStatusModel.findByIdAndDelete(id).exec();
  }
}