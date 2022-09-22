import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuizService } from './application/quiz.service'
import { QuizRepository } from './infrastructure/quiz.repository'
import { QuizController } from './ui/quiz.controller'

@Module({
  imports: [TypeOrmModule.forFeature([QuizRepository])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
