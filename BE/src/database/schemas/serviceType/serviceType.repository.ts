import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceType, ServiceTypeModel } from "./serviceType.schema";
import { ClientSession, ObjectId, Types } from "mongoose";

@Injectable()
export class ServiceTypeRepository {
  constructor(
    @InjectModel(ServiceType.name) private readonly serviceTypeModel: ServiceTypeModel,
  ) {}

  async findById(id: any): Promise<ServiceType | null> {
    return this.serviceTypeModel.findById(id).exec();
  }

  async findLastServiceType(): Promise<ServiceType | null> {
    return this.serviceTypeModel.findOne().sort({ _id: -1 }).exec();
  }

  async findAll(): Promise<ServiceType[]> {
    return this.serviceTypeModel.find().exec();
  }

  async create(serviceType: ServiceType, session: ClientSession): Promise<ServiceType> {
    return (await this.serviceTypeModel.create([serviceType], { session }))[0];
  }

  async update(id: any, serviceType: ServiceType): Promise<ServiceType | null> {
    return this.serviceTypeModel.findByIdAndUpdate(id, serviceType, { new: true }).exec();
  }

  async delete(id: number, session: ClientSession): Promise<ServiceType | null> {
    return this.serviceTypeModel.findByIdAndDelete(id, { session }).exec();
  }
}