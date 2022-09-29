import { Injectable } from '@nestjs/common'
import { ReviewLikeRepository } from '../infrastructure/reviewLike.repository'

@Injectable()
export class ReviewLikeService {
  constructor(private readonly reviewLikeRepository: ReviewLikeRepository) {}
}
