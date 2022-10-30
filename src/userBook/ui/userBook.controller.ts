import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { UserBookService } from '../application/userBook.service'

@Controller('userBook')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}

  @Post('/:id')
  @UseGuards(JwtGuard)
  async readBook(@Req() req: any, @Param('id') id: string) {
    return await this.userBookService.saveUserBook(req.user, Number(id))
  }

  @Get()
  @UseGuards(JwtGuard)
  async getReadBookList(@Req() req) {
    return await this.userBookService.findUserBookListByUserIdx(req.user)
  }
}
