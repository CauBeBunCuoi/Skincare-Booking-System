import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from './services/quiz.service';
import { Types } from 'mongoose';

@Controller('quizzes')
export class QuizController {

  constructor(
    private readonly quizService: QuizService,
  ) { }

  // Lấy kết quả quiz từ các option được chọn (trả về danh sách các service tương ứng được chia theo service type)
  @Post('result')
  async getQuizResult(
    @Body() body: {
      selectedQuizOptions: Types.ObjectId[]
    }
  ) {
    return {
      serviceTypes: await this.quizService.getQuizResult(body.selectedQuizOptions)
    }
  }

  // Lấy danh sách quiz (bao gồm cả danh sách options của từng quiz)
  @Get("")
  async getQuiz() {
    return {
      quizzes: await this.quizService.getAllQuiz()
    }
  }

  // Thêm quiz (bao gồm cả danh sách options của quiz đó)
  @Post("")
  async addQuiz(
    @Body() body: {
      content: string,
      options: { content: string }[]
    }
  ) {
    await this.quizService.addQuiz(body);
    return { message: 'Add quiz successfully' };
  }

  // Cập nhật quiz question (chỉ cập nhật content của QuizQuestion)
  @Post(":quizQuestionId")
  async updateQuizQuestion(
    @Param('quizQuestionId') quizQuestionId: Types.ObjectId,
    @Body() body: {
      content: string
    }
  ) {
    await this.quizService.updateQuizQuestion(quizQuestionId, body);
    return { message: 'Update quiz successfully' };
  }

  // Xóa quiz (xoá QuizQuestion + xoá QuizOptionService + xoá QuizOption)
  @Delete(":quizQuestionId")
  async deleteQuiz(
    @Param('quizQuestionId') quizQuestionId: Types.ObjectId
  ) {
    await this.quizService.deleteQuiz(quizQuestionId);
    return { message: 'Delete quiz successfully' };
  }

  // Thêm quiz option vào quiz question
  @Post(':quizQuestionId/options')
  async addQuizOption(
    @Param('quizQuestionId') quizQuestionId: Types.ObjectId,
    @Body() body: {
      content: string
    }
  ) {
    await this.quizService.addQuizOption(quizQuestionId, body);
    return { message: 'Add quiz option successfully' };
  }

  // Cập nhật quiz option (cập nhật content của quiz option + cập nhật lại mảng document mới của quizOptionService)
  @Post('options/:quizOptionId')
  async updateQuizOption(
    @Param('quizOptionId') quizOptionId: Types.ObjectId,
    @Body() body: {
      content: string,
      serviceIds: Types.ObjectId[]
    }
  ) {
    await this.quizService.updateQuizOption(quizOptionId, body);
    return { message: 'Update quiz option successfully' };
  }

  // Xóa quiz option (xóa quiz option và xóa các document của quizOptionService)
  @Delete('options/:quizOptionId')
  async deleteQuizOption(
    @Param('quizOptionId') quizOptionId: Types.ObjectId
  ) {
    await this.quizService.deleteQuizOption(quizOptionId);
    return { message: 'Delete quiz option successfully' };
  }

  
  // thêm quiz option (thêm option vào quizOption)
  // Cập nhật quiz option (cập nhật content của quizOption + cập nhật lại mảng document mới của quizOptionService)
  // Xoá quiz option (xoá quizOption + xoá document của quizOptionService)

}
