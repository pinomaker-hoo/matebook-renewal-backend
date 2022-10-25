import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { MateService } from '../application/mate.service'

@Controller('mate')
export class MateController {
  constructor(private readonly mateService: MateService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  async saveMate(@Req() req, @Body() body) {
    return await this.mateService.saveMate(req.user, body.name)
  }
}
