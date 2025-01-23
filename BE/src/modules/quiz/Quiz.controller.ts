import { BadRequestException, Body, Controller, Get, HttpException, Param, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from './services/quiz.service';

@Controller('quiz')
export class QuizController {

  constructor(
    private readonly quizService: QuizService,
  ) { }

}
