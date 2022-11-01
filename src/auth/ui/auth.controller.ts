import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { ApiResponse } from 'src/common/dto/api.response'
import { MateService } from 'src/mate/application/mate.service'
import { multerDiskOptions } from 'src/utils/multerOption'
import { AuthService } from '../application/auth.service'
import { MailDto } from '../dto/mail.dto'
import ReqWithUser from '../dto/passport.req.dto'
import { CreateUserDto } from '../dto/user.create.dto'
import JwtGuard from '../passport/auth.jwt.guard'
import KakaoGuard from '../passport/auth.kakao.guard'
import { LocalGuard } from '../passport/auth.local.guard'
import { NaverGuard } from '../passport/auth.naver.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mateService: MateService,
  ) {}

  @Post('/')
  async localSave(@Body() req: CreateUserDto, @Res() res) {
    const user = await this.authService.localSave(req)
    const token = await this.authService.gwtJwtWithIdx(user.idx)
    res.cookie('accessToken', token, {
      expires: new Date(Date.now() + 86400e3),
    })
    res.send(user)
  }

  @UseGuards(LocalGuard)
  @Post('/local')
  async localLogin(@Req() req: ReqWithUser, @Res() res: Response) {
    const { user } = req
    const token = await this.authService.gwtJwtWithIdx(user.idx)
    res.cookie('accessToken', token, {
      expires: new Date(Date.now() + 86400e3),
    })
    res.send({ user, token })
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
    const user = await this.authService.kakaoLogin(req.user)
    const token = await this.authService.gwtJwtWithIdx(user.idx)
    res.cookie('accessToken', token, {
      expires: new Date(Date.now() + 86400e3),
    })
    const mate = await this.mateService.findMateById(user)
    // return mate
    //   ? res.redirect('http://localhost:5173')
    //   : res.redirect('http://localhost:5173/auth/info')
    return mate
      ? res.redirect('http://210.90.136.10:5173/home')
      : res.redirect('http://210.90.136.10:5173/auth/info')
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
    const user = await this.authService.naverLogin(req.user)
    const token = await this.authService.gwtJwtWithIdx(user.idx)
    res.cookie('accessToken', token, {
      expires: new Date(Date.now() + 86400e3),
    })
    const mate = await this.mateService.findMateById(user)
    // return mate
    //   ? res.redirect('http://localhost:5173')
    //   : res.redirect('http://localhost:5173/auth/info')
    return mate
      ? res.redirect('http://210.90.136.10:5173/home')
      : res.redirect('http://210.90.136.10:5173/auth/info')
  }

  @Post('/mail')
  async sendMail(@Body() req: MailDto) {
    const response = await this.authService.sendMail(req.email)
    return ApiResponse.of({
      data: response,
      message: 'Success Send Mail',
      statusCode: 200,
    })
  }

  @Get('/')
  @UseGuards(JwtGuard)
  async getUserInfo(@Req() req) {
    const { user: response } = req
    return ApiResponse.of({
      data: response,
      message: 'success Find User Info',
      statusCode: 200,
    })
  }

  @Patch('/')
  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('files', null, multerDiskOptions))
  async updateImage(@Req() req, @UploadedFiles() files) {
    const { path } = files[0]
    const response = await this.authService.updateImg(req.user, path)
    return ApiResponse.of({
      data: response,
      message: 'Success Change Image File',
      statusCode: 200,
    })
  }
}
