import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { QuizOptionService, QuizOptionServiceModel } from "./quizOptionService.schema";
import { ClientSession, ObjectId, Types } from "mongoose";

@Injectable()
export class QuizOptionServiceRepository {
  constructor(
    @InjectModel(QuizOptionService.name) private readonly quizOptionServiceModel: QuizOptionServiceModel,
  ) {}

  async findById(id: Types.ObjectId): Promise<QuizOptionService | null> {
    return this.quizOptionServiceModel.findById(id).exec();
  }

  async findByQuizOptions(quizOptionIds: Types.ObjectId[]): Promise<QuizOptionService[]> {
    const objectIds = quizOptionIds.map(id => new Types.ObjectId(id));
    return this.quizOptionServiceModel.find({ quizOptionId: { $in: objectIds } }).exec();
  }

  async findAll(): Promise<QuizOptionService[]> {
    return this.quizOptionServiceModel.find().exec();
  }

  async create(quizOptionService: QuizOptionService, session: ClientSession): Promise<QuizOptionService> {
    return (await this.quizOptionServiceModel.create([quizOptionService], { session }))[0];
  }

  async update(id: any, quizOptionService: QuizOptionService): Promise<QuizOptionService | null> {
    return this.quizOptionServiceModel.findByIdAndUpdate(id, quizOptionService, { new: true }).exec();
  }

  async delete(id: any): Promise<QuizOptionService | null> {
    return this.quizOptionServiceModel.findByIdAndDelete(id).exec();
  }

  async deleteByQuizOptions(quizOptionIds: Types.ObjectId[], session: ClientSession): Promise<any> {
    const objectIds = quizOptionIds.map(id => new Types.ObjectId(id));
      return this.quizOptionServiceModel.deleteMany({ quizOptionId: { $in: objectIds } }, { session }).exec();
  }
}