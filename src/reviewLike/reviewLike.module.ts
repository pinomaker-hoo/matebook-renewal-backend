import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewLikeService } from './application/reviwLike.service'
import { ReviewLikeRepository } from './infrastructure/reviewLike.repository'
import { ReviewLikeController } from './ui/reviewLike.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ReviewLikeRepository])],
  controllers: [ReviewLikeController],
  providers: [ReviewLikeService],
})
export class ReviewLikeModule {}
