import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { QuizQuestion, QuizQuestionModel } from "./quizQuestion.schema";
import { ClientSession, ObjectId, Types } from "mongoose";

@Injectable()
export class QuizQuestionRepository {
  constructor(
    @InjectModel(QuizQuestion.name) private readonly quizQuestionModel: QuizQuestionModel,
  ) { }

  async isQuizQuestionContentExist(quizQuestionId: Types.ObjectId, content: string): Promise<boolean> {

    try {
      const escapedContent = content.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      if (quizQuestionId) {
        const isExist = await this.quizQuestionModel.findOne({
          content: { '$regex': `^${escapedContent}$`, $options: 'i' },
          _id: { $ne: quizQuestionId }
        });
        return !!isExist;
      } else {
        const isExist = await this.quizQuestionModel.findOne({
          content: { '$regex': `^${escapedContent}$`, $options: 'i' }
        });
        return !!isExist;
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error checking quiz question content');
    }
  }


  async findById(id: Types.ObjectId): Promise<QuizQuestion | null> {
    return this.quizQuestionModel.findById(id).exec();
  }

  async findAll(): Promise<QuizQuestion[]> {
    return this.quizQuestionModel.find().exec();
  }

  async create(data: QuizQuestion, session: ClientSession): Promise<QuizQuestion> {
    return (await this.quizQuestionModel.create([data], { session }))[0];
  }

  async update(quizQuestion: QuizQuestion, session: ClientSession ): Promise<QuizQuestion | null> {
    return this.quizQuestionModel.findByIdAndUpdate(quizQuestion._id, quizQuestion, { new: true, session }).exec();
  }

  async delete(id: any, session: ClientSession): Promise<QuizQuestion | null> {
    return this.quizQuestionModel.findByIdAndDelete(id, { session }).exec();
  }
}