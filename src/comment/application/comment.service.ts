import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Review } from 'src/review/domain/review.entity'
import { ReviewRepository } from 'src/review/infrastructure/review.repository'
import { Comment } from '../domain/comment.entity'
import { CommentRepository } from '../infrastructure/comment.repository'

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async saveComment(user: User, text: string, reviewIdx: number) {
    try {
      const review: Review = await this.reviewRepository.findOne({
        where: { idx: reviewIdx },
      })
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
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }
}
