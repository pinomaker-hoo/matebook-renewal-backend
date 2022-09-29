import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewService } from 'src/review/application/review.service'
import { ReviewRepository } from 'src/review/infrastructure/review.repository'
import { ReviewModule } from 'src/review/review.module'
import { ReviewLikeService } from './application/reviwLike.service'
import { ReviewLikeRepository } from './infrastructure/reviewLike.repository'
import { ReviewLikeController } from './ui/reviewLike.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewLikeRepository]), ReviewModule],
  controllers: [ReviewLikeController],
  providers: [ReviewLikeService],
})
export class ReviewLikeModule {}
