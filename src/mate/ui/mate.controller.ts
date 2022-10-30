import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { PointService } from 'src/point/application/point.service'
import { MateService } from '../application/mate.service'

@Controller('mate')
export class MateController {
  constructor(
    private readonly mateService: MateService,
    private readonly pointService: PointService,
  ) {}

  @Post('/')
  @UseGuards(JwtGuard)
  async saveMate(@Req() req, @Body() body) {
    return await this.mateService.saveMate(req.user, body.name)
  }

  @Get('/')
  @UseGuards(JwtGuard)
  async findMate(@Req() req) {
    const mate = await this.mateService.findMateByJwt(req.user)
    const point = await this.pointService.getPoint(req.user)
    console.log(point)
    return { mate, point }
  }
}
