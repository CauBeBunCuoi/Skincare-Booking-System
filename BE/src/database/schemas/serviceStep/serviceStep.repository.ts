import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceStep, ServiceStepModel } from "./serviceStep.schema";

@Injectable()
export class ServiceStepRepository {
  constructor(
    @InjectModel(ServiceStep.name) private readonly serviceStepModel: ServiceStepModel,
  ) { }

  async findById(id: any): Promise<ServiceStep | null> {
    return this.serviceStepModel.findById(id).exec();
  }

  async findAll(): Promise<ServiceStep[]> {
    return this.serviceStepModel.find().exec();
  }

  async create(serviceStep: ServiceStep): Promise<ServiceStep> {
    return this.serviceStepModel.create(serviceStep);
  }

  async update(id: any, serviceStep: ServiceStep): Promise<ServiceStep | null> {
    return this.serviceStepModel.findByIdAndUpdate(id, serviceStep, { new: true }).exec();
  }

  async delete(id: any): Promise<ServiceStep | null> {
    return this.serviceStepModel.findByIdAndDelete(id).exec();
  }
  
}