import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { ReviewService } from '../application/review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveReview(@Req() req, @Param('id') idx: string, @Body() body) {
    const { user } = req
    const { text } = body
    return await this.reviewService.saveReview(user, Number(idx), text)
  }

  @Get('/:id')
  async getReviewList(@Param('id') id: string) {
    return await this.reviewService.findBookList(Number(id))
  }
}
