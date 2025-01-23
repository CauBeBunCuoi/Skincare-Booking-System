import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { QuizOptionService, QuizOptionServiceModel } from "./quizOptionService.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class QuizOptionServiceRepository {
  constructor(
    @InjectModel(QuizOptionService.name) private readonly quizOptionServiceModel: QuizOptionServiceModel,
  ) {}

  async findById(id: any): Promise<QuizOptionService | null> {
    return this.quizOptionServiceModel.findById(id).exec();
  }

  async findAll(): Promise<QuizOptionService[]> {
    return this.quizOptionServiceModel.find().exec();
  }

  async create(quizOptionService: QuizOptionService): Promise<QuizOptionService> {
    return this.quizOptionServiceModel.create(quizOptionService);
  }

  async update(id: any, quizOptionService: QuizOptionService): Promise<QuizOptionService | null> {
    return this.quizOptionServiceModel.findByIdAndUpdate(id, quizOptionService, { new: true }).exec();
  }

  async delete(id: any): Promise<QuizOptionService | null> {
    return this.quizOptionServiceModel.findByIdAndDelete(id).exec();
  }
}