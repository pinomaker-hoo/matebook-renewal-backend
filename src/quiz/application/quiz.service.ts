import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Quiz } from '../domain/quiz.entity'
import { QuizKind } from '../dto/quiz.kind.enum'
import { QuizRepository } from '../infrastructure/quiz.repository'

@Injectable()
export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  async saveQuiz(user: User, text: string, answer: boolean): Promise<Quiz> {
    try {
      const quiz = this.quizRepository.create({
        text,
        answer,
        user,
        kind: QuizKind.OX,
      })
      return await this.quizRepository.save(quiz)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async getQuizThree() {
    try {
      const quiz: Quiz[] = await this.quizRepository.find()
      const quizList: Quiz[] = []
      for (let i = 0; i < 3; i++) {
        let r = parseInt(Math.floor(Math.random() * 10).toFixed())
        if (r > quiz.length) {
          quizList.push(quiz[r - quiz.length])
        } else {
          quizList.push(quiz[r])
        }
      }
      return quizList
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.NOT_FOUND)
    }
  }
}
