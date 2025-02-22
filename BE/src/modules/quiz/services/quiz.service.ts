import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, startSession, Types } from 'mongoose';
import { FileService } from 'src/common/services/file.service';
import { QuizOptionRepository } from 'src/database/schemas/quizOption/quizOption.repository';
import { QuizOptionServiceRepository } from 'src/database/schemas/quizOptionService/quizOptionService.repository';
import { QuizQuestionRepository } from 'src/database/schemas/quizQuestion/quizQuestion.repository';
import { QuizQuestion, QuizQuestionModel } from 'src/database/schemas/quizQuestion/quizQuestion.schema';
import { ServiceRepository } from 'src/database/schemas/service/service.repository';
import { Service } from 'src/database/schemas/service/service.schema';
import { ServiceTypeRepository } from 'src/database/schemas/serviceType/serviceType.repository';
import { ServiceType } from 'src/database/schemas/serviceType/serviceType.schema';

@Injectable()
export class QuizService {
    constructor(
        private readonly quizQuestionRepository: QuizQuestionRepository,
        private readonly quizOptionRepository: QuizOptionRepository,
        private readonly quizOptionServiceRepository: QuizOptionServiceRepository,
        private readonly serviceRepository: ServiceRepository,
        private readonly serviceTypeRepository: ServiceTypeRepository,

        @InjectModel(QuizQuestion.name) private quizQuestionModel: QuizQuestionModel,
        @InjectConnection() private readonly connection: Connection,

        private readonly configService: ConfigService,
        private readonly fileService: FileService,
    ) { }

    async getExistQuizQuestion(quizId: Types.ObjectId): Promise<any> {
        const quizQuestion = await this.quizQuestionRepository.findById(quizId);
        if (!quizQuestion) {
            throw new HttpException('Quiz question not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return quizQuestion;
    }

    async getExistQuizOption(quizOptionId: Types.ObjectId): Promise<any> {
        const quizOption = await this.quizOptionRepository.findById(quizOptionId);
        if (!quizOption) {
            throw new HttpException('Quiz option not found', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return quizOption;
    }

    async isQuizQuestionContentExist(quizQuestionId: Types.ObjectId, content: string): Promise<any> {
        let isExist = false;
        try {
            isExist = await this.quizQuestionRepository.isQuizQuestionContentExist(quizQuestionId, content);

        } catch (error) {
            console.log(error);
            throw new HttpException('Error checking quiz question content', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (isExist) {
            throw new HttpException('Quiz question content already exists', HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


    //////////////////////////////////////////////


    async getAllQuiz(): Promise<any> {
        try {
            const questions = await this.quizQuestionRepository.findAll();
            const options = await this.quizOptionRepository.findAll();
            const optionServices = await this.quizOptionServiceRepository.findAll();

            return questions.map(question => {
                return {
                    quiz: question,
                    options: options.filter(option => option.quizQuestionId.equals(question._id)).map(option => {
                        return option
                    })
                }
            })
        } catch (error) {
            console.log(error)
            throw new HttpException('Get all quiz failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async addQuiz(quiz: { content: string, options: { content: string }[] }): Promise<any> {
        await this.isQuizQuestionContentExist(null, quiz.content);
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const question = await this.quizQuestionRepository.create({ content: quiz.content }, session);
            await Promise.all(quiz.options.map(async option => {
                await this.quizOptionRepository.create({ content: option.content, quizQuestionId: question._id }, session);
            }))

            await session.commitTransaction();

        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            throw new HttpException('Add quiz failed', HttpStatus.INTERNAL_SERVER_ERROR);

        } finally {
            session.endSession();
        }
    }

    async updateQuizQuestion(quizQuestionId: Types.ObjectId, quizQuestion: { content: string }): Promise<any> {
        await this.getExistQuizQuestion(quizQuestionId);
        await this.isQuizQuestionContentExist(quizQuestionId, quizQuestion.content);
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            await this.quizQuestionRepository.update({ _id: quizQuestionId, content: quizQuestion.content }, session);
            await session.commitTransaction();
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            throw new HttpException('Update quiz question failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }
    }

    async deleteQuiz(quizQuestionId: Types.ObjectId): Promise<any> {
        await this.getExistQuizQuestion(quizQuestionId);

        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const quizOptions = await this.quizOptionRepository.findByQuizQuestionId(quizQuestionId);
            await this.quizQuestionRepository.delete(quizQuestionId, session);
            await this.quizOptionRepository.deleteByQuizQuestionId(quizQuestionId, session);
            await this.quizOptionServiceRepository.deleteByQuizOptions(quizOptions.map(option => new Types.ObjectId(option._id)), session);
            await session.commitTransaction();
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            throw new HttpException('Delete quiz failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }
    }

    async addQuizOption(quizQuestionId: Types.ObjectId, quizOption: { content: string }): Promise<any> {
        await this.getExistQuizQuestion(quizQuestionId);
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            await this.quizOptionRepository.create({ content: quizOption.content, quizQuestionId: new Types.ObjectId(quizQuestionId) }, session);
            await session.commitTransaction();
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            throw new HttpException('Add quiz option failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }
    }

    async updateQuizOption(quizOptionId: Types.ObjectId, quizOption: { content: string, serviceIds: Types.ObjectId[] }): Promise<any> {
        await this.getExistQuizOption(quizOptionId);
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            await this.quizOptionRepository.update(quizOptionId, quizOption.content, session);
            await this.quizOptionServiceRepository.deleteByQuizOptions([quizOptionId], session);
            await Promise.all(quizOption.serviceIds.map(async serviceId => {
                await this.quizOptionServiceRepository.create({ quizOptionId: new Types.ObjectId(quizOptionId), serviceId: new Types.ObjectId(serviceId) }, session);
            }))
            await session.commitTransaction();
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            throw new HttpException('Update quiz option failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }
    }

    async deleteQuizOption(quizOptionId: Types.ObjectId): Promise<any> {
        await this.getExistQuizOption(quizOptionId);
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            await this.quizOptionRepository.delete(quizOptionId, session);
            await this.quizOptionServiceRepository.deleteByQuizOptions([quizOptionId], session);
            await session.commitTransaction();
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            throw new HttpException('Delete quiz option failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            session.endSession();
        }
    }

    async getQuizResult(quizOptionIds: Types.ObjectId[]): Promise<any> {
        try {
            const quizOptionServices = await this.quizOptionServiceRepository.findByQuizOptions(quizOptionIds);
            const serviceIds = quizOptionServices.map(optionService => optionService.serviceId);
            const services = await Promise.all(serviceIds.map(async serviceId => {
                return await this.serviceRepository.findById(serviceId);
            }))
            const result: {
                serviceType: ServiceType,
                services: (Service & { imageUrl: string })[]
            }[] = [];


            for (const service of services.filter(service => service.isDeleted == false)) {
                const serviceType = await this.serviceTypeRepository.findById(service.serviceTypeId);
                if (!result.some(item => item.serviceType._id === serviceType._id)) {
                    result.push({
                        serviceType: serviceType,
                        services: [{
                            ...service,
                            imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), service._id, "main"),
                        }]
                    })
                } else {
                    result.find(item => item.serviceType._id === serviceType._id).services.push({
                        ...service,
                        imageUrl: await this.fileService.getImageUrl(this.configService.get<string>('imagePathConfig.SERVICE_IMAGE_PATH'), service._id, "main"),
                    });
                }
            }

            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException('Get quiz result failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null

    }

}
