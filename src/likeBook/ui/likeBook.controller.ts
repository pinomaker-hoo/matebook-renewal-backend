import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { LikeBookService } from '../application/likeBook.service'

@Controller('likeBook')
export class LikeBookController {
  constructor(private readonly likeBookService: LikeBookService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async saveLikeBook(@Req() req, @Param('id') id: string) {
    return await this.likeBookService.saveLikeBook(req.user, Number(id))
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async deleteLikeBook(@Param('id') id: string, @Req() req) {
    return await this.likeBookService.deleteLikeBook(req.user, Number(id))
  }

  @Get('/')
  @UseGuards(JwtGuard)
  async getLikeBookList(@Req() req) {
    console.log(req.user)
    return await this.likeBookService.getLikeBookList(req.user)
  }
}
