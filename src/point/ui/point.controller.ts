import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import JwtGuard from 'src/auth/passport/auth.jwt.guard'
import { PointService } from '../application/point.service'

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  @UseGuards(JwtGuard)
  async savePoint(@Req() req, @Body() body) {
    return await this.pointService.savePoint(req.user, body.point)
  }
}
