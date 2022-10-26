import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { BookService } from 'src/book/application/book.service'
import { Book } from 'src/book/domain/book.entity'
import { Quiz } from '../domain/quiz.entity'
import { QuizKind } from '../dto/quiz.kind.enum'
import { QuizRepository } from '../infrastructure/quiz.repository'

@Injectable()
export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly bookService: BookService,
  ) {}

  async saveQuiz(
    user: User,
    text: string,
    answer: boolean,
    idx: number,
  ): Promise<Quiz> {
    try {
      const book: Book = await this.bookService.findBookByIdxForQuiz(idx)
      const quiz = this.quizRepository.create({
        text,
        answer,
        user,
        kind: QuizKind.OX,
        book,
      })
      return await this.quizRepository.save(quiz)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async getQuizListByBookIdx(idx: number) {
    try {
      return await this.quizRepository.find({
        where: { book: idx },
      })
      // const ReturnQuizList: Quiz[] = []
      // for (let i = 0; i < 3; i++) {
      //   let r = parseInt(Math.floor(Math.random() * 10).toFixed())
      //   if (r > findQuizList.length) {
      //     ReturnQuizList.push(findQuizList[r - findQuizList.length])
      //   } else {
      //     ReturnQuizList.push(findQuizList[r])
      //   }
      // }
      // return ReturnQuizList
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.NOT_FOUND)
    }
  }
}
