import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { QuizService } from '../application/quiz.service'
import { RequestSaveQuizDto } from '../dto/quiz.save.dto'

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(JwtGuard)
  async saveQuiz(@Body() Body: RequestSaveQuizDto, @Req() req) {
    const { user } = req
    return await this.quizService.saveQuiz(user, Body.text, Body.answer)
  }

  @Get()
  async getQuizThree() {
    return await this.quizService.getQuizThree()
  }
}
