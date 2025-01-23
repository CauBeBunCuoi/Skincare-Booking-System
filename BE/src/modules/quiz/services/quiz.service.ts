import { Injectable } from '@nestjs/common';
import { QuizOptionRepository } from 'src/database/schemas/quizOption/quizOption.repository';
import { QuizOptionServiceRepository } from 'src/database/schemas/quizOptionService/quizOptionService.repository';
import { QuizQuestionRepository } from 'src/database/schemas/quizQuestion/quizQuestion.repository';

@Injectable()
export class QuizService {
    constructor(
        private readonly quizQuestionRepository: QuizQuestionRepository,
        private readonly quizOptionRepository: QuizOptionRepository,
        private readonly quizOptionServiceRepository: QuizOptionServiceRepository,
    ) { }

    
}
