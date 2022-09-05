import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-naver'

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: 'mfvgn8HnVR6pfLot_vbg',
      clientSecret: '6nuPvrSxDN',
      callbackURL: 'http://localhost:8003/auth/naver/callback',
    })
  }

  async validate(accessToken, refreshToken, profile, done) {
    console.log(profile)
  }
}
