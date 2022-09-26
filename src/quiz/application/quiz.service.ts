import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Quiz } from '../domain/quiz.entity'
import { QuizKind } from '../dto/quiz.kind.enum'
import { QuizRepository } from '../infrastructure/quiz.repository'

@Injectable()
export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  async saveQuiz(user: User, text: string, answer: boolean): Promise<Quiz> {
    const quiz = this.quizRepository.create({
      text,
      answer,
      user,
      kind: QuizKind.OX,
    })
    return await this.quizRepository.save(quiz)
  }
}
