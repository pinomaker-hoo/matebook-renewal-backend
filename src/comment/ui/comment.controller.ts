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
import { CommentService } from '../application/comment.service'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveComment(@Body() body, @Req() req, @Param('id') reviewIdx: string) {
    const { user } = req
    const { text } = body
    return await this.commentService.saveComment(user, text, Number(reviewIdx))
  }

  @Get('/:id')
  async getComment(@Param('id') reviewIdx: string) {
    return await this.commentService.getCommentList(Number(reviewIdx))
  }
}
