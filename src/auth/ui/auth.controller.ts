import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '../application/auth.service'
import { User } from '../domain/user.entity'
import ReqWithUser from '../dto/passport.req.dto'
import { CreateUserDto } from '../dto/user.create.dto'
import KakaoGuard from '../passport/auth.kakao.guard'
import { LocalGuard } from '../passport/auth.local.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async serverCheck() {
    return 'Hello world'
  }

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

  @Get('/kakao')
  @HttpCode(200)
  @UseGuards(KakaoGuard)
  async kakaoLogin() {
    return HttpStatus.OK
  }

  @Get('kakao/callback')
  @HttpCode(200)
  @UseGuards(KakaoGuard)
  async kakaoLoginCallback(@Req() req): Promise<{ accessToken: string }> {
    return this.authService.kakaoLogin(req.user)
  }
}
