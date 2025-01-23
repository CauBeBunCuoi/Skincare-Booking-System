import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Service, ServiceModel } from "./service.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: ServiceModel,
  ) {}

  async findById(id: any): Promise<Service | null> {
    return this.serviceModel.findById(id).exec();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async create(service: Service): Promise<Service> {
    return this.serviceModel.create(service);
  }

  async update(id: any, service: Service): Promise<Service | null> {
    return this.serviceModel.findByIdAndUpdate(id, service, { new: true }).exec();
  }

  async delete(id: any): Promise<Service | null> {
    return this.serviceModel.findByIdAndDelete(id).exec();
  }
}