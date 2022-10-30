import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { QuizService } from '../application/quiz.service'
import { RequestSaveQuizDto } from '../dto/quiz.save.dto'

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveQuiz(
    @Body() Body: RequestSaveQuizDto,
    @Req() req,
    @Param('id') id,
  ) {
    const { user } = req
    return await this.quizService.saveQuiz(
      user,
      Body.text,
      Body.answer,
      Number(id),
    )
  }

  @Get('/:id')
  async getQuizList(@Param('id') id: string) {
    return await this.quizService.getQuizListByBookIdx(Number(id))
  }

  @Get('/quiz/:id')
  async getQuiz(@Param('id') id: string) {
    return await this.quizService.findQuizByIdx(Number(id))
  }
}
