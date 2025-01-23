import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { QuizOption, QuizOptionModel } from "./quizOption.schema";
import { ObjectId } from "mongoose";

@Injectable()
export class QuizOptionRepository {
  constructor(
    @InjectModel(QuizOption.name) private readonly quizOptionModel: QuizOptionModel,
  ) {}

  async findById(id: any): Promise<QuizOption | null> {
    return this.quizOptionModel.findById(id).exec();
  }

  async findAll(): Promise<QuizOption[]> {
    return this.quizOptionModel.find().exec();
  }

  async create(quizOption: QuizOption): Promise<QuizOption> {
    return this.quizOptionModel.create(quizOption);
  }

  async update(id: any, quizOption: QuizOption): Promise<QuizOption | null> {
    return this.quizOptionModel.findByIdAndUpdate(id, quizOption, { new: true }).exec();
  }

  async delete(id: any): Promise<QuizOption | null> {
    return this.quizOptionModel.findByIdAndDelete(id).exec();
  }
}