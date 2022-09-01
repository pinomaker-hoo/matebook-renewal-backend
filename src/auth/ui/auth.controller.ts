import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from '../application/auth.service'
import { User } from '../domain/user.entity'
import ReqWithUser from '../dto/passport.req.dto'
import { CreateUserDto } from '../dto/user.create.dto'
import { LocalGuard } from '../passport/auth.local.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post()
  async login(@Req() req: ReqWithUser, @Res() res) {
    const { user } = req
    const token = await this.authService.jwtWithCookie(user.idx)
    return res.json({ info: user, token: token })
  }

  @Post('/register')
  async save(@Body() req: CreateUserDto): Promise<User> {
    return await this.authService.save(req)
  }
}
