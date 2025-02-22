import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TherapistService, TherapistServiceModel } from "./therapistService.schema";
import { Types } from "mongoose";

@Injectable()
export class TherapistServiceRepository {
  constructor(
    @InjectModel(TherapistService.name) private readonly therapistServiceModel: TherapistServiceModel,
  ) {}

  async findById(id: any): Promise<TherapistService | null> {
    return this.therapistServiceModel.findById(id).exec();
  }

  async findAll(): Promise<TherapistService[]> {
    return this.therapistServiceModel.find().exec();
  }

  async findByTherapistId(therapistId: Types.ObjectId): Promise<TherapistService[]> {
    return this.therapistServiceModel.find({ accountId: new Types.ObjectId(therapistId) }).exec();
  }

  async findByServiceId(serviceId: Types.ObjectId): Promise<TherapistService[]> {
    return this.therapistServiceModel.find({ serviceId: new Types.ObjectId(serviceId) }).exec();
  }

  async create(therapistService: TherapistService): Promise<TherapistService> {
    return this.therapistServiceModel.create(therapistService);
  }

  async createMany(therapistServices: TherapistService[]): Promise<TherapistService[]> {
    return this.therapistServiceModel.insertMany(therapistServices);
  }
  
  async update(id: any, therapistService: TherapistService): Promise<TherapistService | null> {
    return this.therapistServiceModel.findByIdAndUpdate(id, therapistService, { new: true }).exec();
  }

  async delete(id: any): Promise<TherapistService | null> {
    return this.therapistServiceModel.findByIdAndDelete(id).exec();
  }

  async deleteByTherapistIdAndServiceId(therapistId: Types.ObjectId, serviceId: Types.ObjectId): Promise<TherapistService | null> {
    return this.therapistServiceModel.findOneAndDelete({ accountId: new Types.ObjectId(therapistId), serviceId: serviceId }).exec();
  }
}