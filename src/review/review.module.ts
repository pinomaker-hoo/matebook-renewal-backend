import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookService } from 'src/book/application/book.service'
import { BookModule } from 'src/book/book.module'
import { BookRepository } from 'src/book/infrastructure/book.repository'
import { ReviewService } from './application/review.service'
import { ReviewRepository } from './infrastructure/review.repository'
import { ReviewController } from './ui/review.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository]), BookModule],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
