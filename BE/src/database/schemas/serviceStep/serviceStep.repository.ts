import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceStep, ServiceStepModel } from "./serviceStep.schema";
import { ClientSession, Types } from "mongoose";

@Injectable()
export class ServiceStepRepository {
  constructor(
    @InjectModel(ServiceStep.name) private readonly serviceStepModel: ServiceStepModel,
  ) { }

  async findById(id: any): Promise<ServiceStep | null> {
    return this.serviceStepModel.findById(id).exec();
  }

  async findLatestStep(serviceId: Types.ObjectId, session: ClientSession): Promise<ServiceStep | null> {
    return this.serviceStepModel.findOne({ serviceId }).sort({ _id: -1 }).session(session).exec();
  }

  async findByServiceId(serviceId: Types.ObjectId): Promise<ServiceStep[]> {
    return this.serviceStepModel.find({ serviceId }).sort({ stepOrder: 1 }).lean().exec();
  }

  async findAll(): Promise<ServiceStep[]> {
    return this.serviceStepModel.find().exec();
  }

  async create(serviceStep: ServiceStep, session: ClientSession): Promise<ServiceStep> {
    return (await this.serviceStepModel.create([serviceStep], { session }))[0];
  }

  async update(id: any, serviceStep: ServiceStep): Promise<ServiceStep | null> {
    return this.serviceStepModel.findByIdAndUpdate(id, serviceStep, { new: true }).exec();
  }

  async delete(id: any): Promise<ServiceStep | null> {
    return this.serviceStepModel.findByIdAndDelete(id).exec();
  }

  async deleteByServiceId(serviceId: Types.ObjectId, session: ClientSession): Promise<any> {
    return this.serviceStepModel.deleteMany({ serviceId: serviceId }, { session }).exec();
  }

}