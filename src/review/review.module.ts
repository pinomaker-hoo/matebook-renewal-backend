import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookService } from 'src/book/application/book.service'
import { BookRepository } from 'src/book/infrastructure/book.repository'
import { ReviewService } from './application/review.service'
import { ReviewRepository } from './infrastructure/review.repository'
import { ReviewController } from './ui/review.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository])],
  controllers: [ReviewController],
  providers: [ReviewService, BookService, BookRepository],
})
export class ReviewModule {}
