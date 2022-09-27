import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewService } from './application/review.service'
import { ReviewRepository } from './infrastructure/review.repository'
import { ReviewController } from './ui/review.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
