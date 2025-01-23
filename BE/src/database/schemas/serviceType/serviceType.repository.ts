import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceType, ServiceTypeModel } from "./serviceType.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class ServiceTypeRepository {
  constructor(
    @InjectModel(ServiceType.name) private readonly serviceTypeModel: ServiceTypeModel,
  ) {}

  async findById(id: any): Promise<ServiceType | null> {
    return this.serviceTypeModel.findById(id).exec();
  }

  async findAll(): Promise<ServiceType[]> {
    return this.serviceTypeModel.find().exec();
  }

  async create(serviceType: ServiceType): Promise<ServiceType> {
    return this.serviceTypeModel.create(serviceType);
  }

  async update(id: any, serviceType: ServiceType): Promise<ServiceType | null> {
    return this.serviceTypeModel.findByIdAndUpdate(id, serviceType, { new: true }).exec();
  }

  async delete(id: any): Promise<ServiceType | null> {
    return this.serviceTypeModel.findByIdAndDelete(id).exec();
  }
}