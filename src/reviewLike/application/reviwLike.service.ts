import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { ReviewService } from 'src/review/application/review.service'
import { Review } from 'src/review/domain/review.entity'
import { ReviewLike } from '../domain/reviewLike.entity'
import { ReviewLikeRepository } from '../infrastructure/reviewLike.repository'

@Injectable()
export class ReviewLikeService {
  constructor(
    private readonly reviewLikeRepository: ReviewLikeRepository,
    private readonly reviewService: ReviewService,
  ) {}

  async likeReview(user: User, reviewIdx: number) {
    try {
      const review: Review = await this.reviewService.findReviewById(reviewIdx)
      const liked: boolean = await this.getLiked(user, review)
      if (liked) return new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      const reviewLike: ReviewLike = this.reviewLikeRepository.create({
        user,
        review,
      })
      return await this.reviewLikeRepository.save(reviewLike)
    } catch (err) {
      console.log(err)
    }
  }

  async cancelLike(user: User, reviewIdx: number) {
    try {
      const review: Review = await this.reviewService.findReviewById(reviewIdx)
      const liked: boolean = await this.getLiked(user, review)
      if (!liked)
        return new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
      const reviewLike: ReviewLike = await this.reviewLikeRepository.findOne({
        where: { user, review },
      })
      return await this.reviewLikeRepository.delete(reviewLike)
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  async getLiked(user: User, review: Review) {
    try {
      const reviewLike: ReviewLike = await this.reviewLikeRepository.findOne({
        where: { user, review },
      })
      return reviewLike ? true : false
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }
  }
}
