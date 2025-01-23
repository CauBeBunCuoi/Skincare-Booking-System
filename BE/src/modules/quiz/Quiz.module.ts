import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { QuizController } from './Quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizQuestion, QuizQuestionSchema } from 'src/database/schemas/quizQuestion/quizQuestion.schema';
import { QuizOption, QuizOptionSchema } from 'src/database/schemas/quizOption/quizOption.schema';
import { QuizOptionService, QuizOptionServiceSchema } from 'src/database/schemas/quizOptionService/quizOptionService.schema';
import { QuizService } from './services/quiz.service';
import { QuizQuestionRepository } from 'src/database/schemas/quizQuestion/quizQuestion.repository';
import { QuizOptionRepository } from 'src/database/schemas/quizOption/quizOption.repository';
import { QuizOptionServiceRepository } from 'src/database/schemas/quizOptionService/quizOptionService.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizQuestion.name, schema: QuizQuestionSchema },              // quizQuestions
      { name: QuizOption.name, schema: QuizOptionSchema },                  // quizOptions
      { name: QuizOptionService.name, schema: QuizOptionServiceSchema },    // quizOptionServices
    ])
  ],
  controllers: [QuizController],
  providers: [
    // Repositories
    QuizQuestionRepository,
    QuizOptionRepository,
    QuizOptionServiceRepository,

    // Services
    QuizService
  ],
  exports: [
    QuizService
  ]
})
export class QuizModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(

    ).forRoutes(
    );
  }
}
