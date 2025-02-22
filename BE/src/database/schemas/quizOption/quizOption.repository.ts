import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { QuizOption, QuizOptionModel } from "./quizOption.schema";
import { ClientSession, Types } from "mongoose";

@Injectable()
export class QuizOptionRepository {
  constructor(
    @InjectModel(QuizOption.name) private readonly quizOptionModel: QuizOptionModel,
  ) { }

  async findById(id: any): Promise<QuizOption | null> {
    return this.quizOptionModel.findById(id).exec();
  }

  async findByQuizQuestionId(quizQuestionId: Types.ObjectId): Promise<QuizOption[]> {
    return this.quizOptionModel.find({ quizQuestionId: new Types.ObjectId(quizQuestionId) }).exec();
  }

  async findAll(): Promise<QuizOption[]> {
    return this.quizOptionModel.find().exec();
  }

  async create( quizOption: QuizOption, session: ClientSession ): Promise<QuizOption> {
    return (await this.quizOptionModel.create([quizOption], { session }))[0];
  }

  async update(id: Types.ObjectId, content: string, session: ClientSession ): Promise<QuizOption | null> {
    return this.quizOptionModel.findByIdAndUpdate(id, { content }, { new: true, session }).exec();
  }

  async delete(id: Types.ObjectId, session: ClientSession ): Promise<QuizOption | null> {
    return this.quizOptionModel.findByIdAndDelete(id, { session }).exec();
  }

  async deleteByQuizQuestionId(quizQuestionId: Types.ObjectId, session: ClientSession): Promise<any> {
      return this.quizOptionModel.deleteMany({ quizQuestionId: new Types.ObjectId(quizQuestionId) }, { session }).exec();
  }
}