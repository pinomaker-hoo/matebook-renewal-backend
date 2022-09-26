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
import { Response } from 'express'
import { AuthService } from '../application/auth.service'
import { User } from '../domain/user.entity'
import { MailDto } from '../dto/mail.dto'
import ReqWithUser from '../dto/passport.req.dto'
import { CreateUserDto } from '../dto/user.create.dto'
import KakaoGuard from '../passport/auth.kakao.guard'
import { LocalGuard } from '../passport/auth.local.guard'
import { NaverGuard } from '../passport/auth.naver.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async localSave(@Body() req: CreateUserDto): Promise<User> {
    console.log(req)
    return await this.authService.localSave(req)
  }

  @UseGuards(LocalGuard)
  @Post('/local')
  async localLogin(@Req() req: ReqWithUser, @Res() res: Response) {
    const { user } = req
    const token = await this.authService.gwtJwtWithIdx(user.idx)
    res.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60,
    })
    res.send('http://localhost:5173')
  }

  @Get('/kakao')
  @HttpCode(200)
  @UseGuards(KakaoGuard)
  async kakaoLogin() {
    return HttpStatus.OK
  }

  @Get('/kakao/callback')
  @HttpCode(200)
  @UseGuards(KakaoGuard)
  async kakaoCallBack(@Req() req, @Res() res: Response) {
    const token = await this.authService.kakaoLogin(req.user)
    res.header('Access-Control-Allow-Origin', '*')
    res.set('Authorization', 'Bearer ' + token)
    res.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60,
    })
    res.redirect('http://localhost:5173')
  }

  @Get('/naver')
  @HttpCode(200)
  @UseGuards(NaverGuard)
  async naverLogin() {
    return HttpStatus.OK
  }

  @Get('/naver/callback')
  @HttpCode(200)
  @UseGuards(NaverGuard)
  async naverCallBack(@Req() req, @Res() res: Response) {
    const token = await this.authService.naverLogin(req.user)
    res.header('Access-Control-Allow-Origin', '*')
    res.set('Authorization', 'Bearer ' + token)
    res.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60,
    })
    res.redirect('http://localhost:5173')
  }

  @Post('/mail')
  async sendMail(@Body() req: MailDto) {
    return this.authService.sendMail(req.email)
  }
}
