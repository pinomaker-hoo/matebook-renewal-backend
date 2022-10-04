import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { ReviewService } from 'src/review/application/review.service'
import { Review } from 'src/review/domain/review.entity'
import { Comment } from '../domain/comment.entity'
import { CommentRepository } from '../infrastructure/comment.repository'

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly reviewService: ReviewService,
  ) {}

  async saveComment(user: User, text: string, reviewIdx: number) {
    try {
      const review: Review = await this.reviewService.findReviewById(reviewIdx)
      const comment: Comment = this.commentRepository.create({
        user,
        text,
        review,
      })
      return await this.commentRepository.save(comment)
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  async getCommentList(reviewIdx: number): Promise<Comment[]> {
    try {
      return await this.commentRepository.find({ where: { review: reviewIdx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }
}
