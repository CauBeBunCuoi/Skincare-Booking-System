import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TherapistBackground, TherapistBackgroundModel } from "./therapistBackground.schema";
import { Types } from "mongoose";

@Injectable()
export class TherapistBackgroundRepository {
  constructor(
    @InjectModel(TherapistBackground.name) private readonly therapistBackgroundModel: TherapistBackgroundModel,
  ) {}

  async findById(id: any): Promise<TherapistBackground | null> {
    return this.therapistBackgroundModel.findById(id).exec();
  }

  async findAll(): Promise<TherapistBackground[]> {
    return this.therapistBackgroundModel.find().exec();
  }

  async findByTherapistId(therapistId: Types.ObjectId): Promise<TherapistBackground[] | null> {
    return this.therapistBackgroundModel.find({ accountId: new Types.ObjectId(therapistId) }).exec();
  }

  async create(therapistBackground: TherapistBackground): Promise<TherapistBackground> {
    return this.therapistBackgroundModel.create(therapistBackground);
  }

  async createMany(therapistBackgrounds: TherapistBackground[]): Promise<TherapistBackground[]> {
    return this.therapistBackgroundModel.insertMany(therapistBackgrounds);
  }

  async update(id: any, therapistBackground: TherapistBackground): Promise<TherapistBackground | null> {
    return this.therapistBackgroundModel.findByIdAndUpdate(id, therapistBackground, { new: true }).exec();
  }

  async delete(id: any): Promise<TherapistBackground | null> {
    return this.therapistBackgroundModel.findByIdAndDelete(id).exec();
  }
}