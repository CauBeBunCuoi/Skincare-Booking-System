import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceSkinStatus, ServiceSkinStatusModel } from "./serviceSkinStatus.schema";
import { ObjectId, Types } from "mongoose";

@Injectable()
export class ServiceSkinStatusRepository {
  constructor(
    @InjectModel(ServiceSkinStatus.name) private readonly serviceSkinStatusModel: ServiceSkinStatusModel,
  ) {}

  async findById(id: any): Promise<ServiceSkinStatus | null> {
    return this.serviceSkinStatusModel.findById(id).exec();
  }

  async findBySkinStatusIds(skinStatusIds: number[]): Promise<ServiceSkinStatus[]> {
    return this.serviceSkinStatusModel.find({ statusId: { $in: skinStatusIds } }).exec();
  }

  async findByServiceId(serviceId: Types.ObjectId): Promise<ServiceSkinStatus[]> {
    return this.serviceSkinStatusModel.find({ serviceId : new Types.ObjectId(serviceId) }).exec();
  }

  async findAll(): Promise<ServiceSkinStatus[]> {
    return this.serviceSkinStatusModel.find().exec();
  }

  async create(data: ServiceSkinStatus): Promise<ServiceSkinStatus> {
    return this.serviceSkinStatusModel.create(data);
  }

  async update(id: any, data: ServiceSkinStatus): Promise<ServiceSkinStatus | null> {
    return this.serviceSkinStatusModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: any): Promise<ServiceSkinStatus | null> {
    return this.serviceSkinStatusModel.findByIdAndDelete(id).exec();
  }

  async deleteByServiceId(serviceId: Types.ObjectId): Promise<any> {
    return this.serviceSkinStatusModel.deleteMany({ serviceId: new Types.ObjectId(serviceId) }).exec();
  }
}