import { Controller } from '@nestjs/common'
import { ReviewLikeService } from '../application/reviwLike.service'

@Controller('reviewLike')
export class ReviewLikeController {
  constructor(private readonly reviewLikeService: ReviewLikeService) {}
}
