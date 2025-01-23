import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { QuizQuestion, QuizQuestionModel } from "./quizQuestion.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class QuizQuestionRepository {
  constructor(
    @InjectModel(QuizQuestion.name) private readonly quizQuestionModel: QuizQuestionModel,
  ) {}

  async findById(id: any): Promise<QuizQuestion | null> {
    return this.quizQuestionModel.findById(id).exec();
  }

  async findAll(): Promise<QuizQuestion[]> {
    return this.quizQuestionModel.find().exec();
  }

  async create(data: Partial<QuizQuestion>): Promise<QuizQuestion> {
    return this.quizQuestionModel.create(data);
  }

  async update(id: any, data: Partial<QuizQuestion>): Promise<QuizQuestion | null> {
    return this.quizQuestionModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: any): Promise<QuizQuestion | null> {
    return this.quizQuestionModel.findByIdAndDelete(id).exec();
  }
}