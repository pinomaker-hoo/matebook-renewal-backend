import { Injectable } from '@nestjs/common'
import { ReviewRepository } from '../infrastructure/review.repository'

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}
}
