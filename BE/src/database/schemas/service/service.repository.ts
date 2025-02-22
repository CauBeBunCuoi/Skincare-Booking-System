import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Service, ServiceModel } from "./service.schema";
import { ClientSession, ObjectId, Types } from "mongoose";

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: ServiceModel,
  ) { }

  async findById(id: any): Promise<Service | null> {
    return this.serviceModel.findById(id).lean().exec();
  }

  async findByServiceTypeId(serviceTypeId: number): Promise<Service[]> {
    return this.serviceModel.find({ serviceTypeId }).exec();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().lean().exec();
  }

  async create(service: Service, session: ClientSession): Promise<Service> {
    return (await this.serviceModel.create([service], { session }))[0];
  }

  async update(service: Service, session: ClientSession): Promise<Service | null> {
    return this.serviceModel.findByIdAndUpdate(service._id, service, { new: true, session }).exec();
  }

  async delete(id: Types.ObjectId, session: ClientSession): Promise<Service | null> {
    return this.serviceModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session }).exec();
  }

  async deleteByServiceTypeId(serviceTypeId: number, session: ClientSession): Promise<any> {
    return this.serviceModel.deleteMany({ serviceTypeId }, { session }).exec();
  }
}