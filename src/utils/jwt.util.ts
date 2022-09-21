import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { JwtConfig } from '../config/jwt-config'

@Injectable()
export class TokenProvider {
  constructor(private readonly jwtConfig: JwtConfig) {}

  async getAccessToken(idx: string): Promise<string> {
    return jwt.sign({ idx }, this.jwtConfig.secret, {
      expiresIn: this.jwtConfig.expiresIn,
    })
  }
}
