import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceSkinType, ServiceSkinTypeModel } from "./serviceSkinType.schema";
import { ObjectId, Types } from "mongoose";

@Injectable()
export class ServiceSkinTypeRepository {
  constructor(
    @InjectModel(ServiceSkinType.name) private readonly serviceSkinTypeModel: ServiceSkinTypeModel,
  ) {}

  async findById(id: any): Promise<ServiceSkinType | null> {
    return this.serviceSkinTypeModel.findById(id).exec();
  }

  async findBySkinTypeIds(skinTypeIds: number[]): Promise<ServiceSkinType[]> {
    return this.serviceSkinTypeModel.find({ skinId: { $in: skinTypeIds } }).exec();
  }

  async findByServiceId(serviceId: Types.ObjectId): Promise<ServiceSkinType[]> {
    return this.serviceSkinTypeModel.find({ serviceId : new Types.ObjectId(serviceId) }).exec();
  }

  async findAll(): Promise<ServiceSkinType[]> {
    return this.serviceSkinTypeModel.find().exec();
  }

  async create(serviceSkinType: ServiceSkinType): Promise<ServiceSkinType> {
    return this.serviceSkinTypeModel.create(serviceSkinType);
  }

  async update(id: any, serviceSkinType: ServiceSkinType): Promise<ServiceSkinType | null> {
    return this.serviceSkinTypeModel.findByIdAndUpdate(id, serviceSkinType, { new: true }).exec();
  }

  async delete(id: any): Promise<ServiceSkinType | null> {
    return this.serviceSkinTypeModel.findByIdAndDelete(id).exec();
  }

  async deleteByServiceId(serviceId: Types.ObjectId): Promise<any> {
    return this.serviceSkinTypeModel.deleteMany({ serviceId: new Types.ObjectId(serviceId) }).exec();
  }
}