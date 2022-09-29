import { Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { BookRepository } from 'src/book/infrastructure/book.repository'
import { Review } from '../domain/review.entity'
import { ReviewRepository } from '../infrastructure/review.repository'

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly bookRepository: BookRepository,
  ) {}

  async saveReview(user: User, bookIdx: number, text: string): Promise<Review> {
    const book = await this.bookRepository.findOne({ where: { idx: bookIdx } })
    const review = this.reviewRepository.create({ user, book, text })
    return await this.reviewRepository.save(review)
  }

  async findBookList(idx: number): Promise<Review[]> {
    return await this.reviewRepository.find({ where: { idx } })
  }
}
