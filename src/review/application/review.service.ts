import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { BookService } from 'src/book/application/book.service'
import { Book } from 'src/book/domain/book.entity'
import { Review } from '../domain/review.entity'
import { ReviewRepository } from '../infrastructure/review.repository'

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly bookService: BookService,
  ) {}

  async saveReview(user: User, bookIdx: number, text: string): Promise<Review> {
    try {
      const book: Book = await this.bookService.findBookByIdx(bookIdx)
      const review = this.reviewRepository.create({ user, book, text })
      return await this.reviewRepository.save(review)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async findBookList(idx: number): Promise<Review[]> {
    try {
      return await this.reviewRepository.find({ where: { idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async findReviewById(idx: number): Promise<Review> {
    try {
      return await this.reviewRepository.findOne({
        where: { idx },
        relations: ['user'],
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
