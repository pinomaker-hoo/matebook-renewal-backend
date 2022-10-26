import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-naver'
import { NaverDto } from '../dto/passport.naver.dto'
import { Provider } from '../dto/user.provider.enum'

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
    const { id, displayName, emails } = profile

    const payload: NaverDto = {
      name: displayName,
      provider: Provider.NAVER,
      naverId: id,
      email: emails[0].value,
    }
    done(null, payload)
  }
}
