import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from '../infrastructure/user.repository'
import * as bcrypt from 'bcryptjs'
import { User } from '../domain/user.entity'
import { CreateUserDto } from '../dto/user.create.dto'
import { JwtService } from '@nestjs/jwt'
import { KakaoDto } from '../dto/passport.kakao.dto'
import { NaverDto } from '../dto/passport.naver.dto'
import { Provider } from '../dto/user.provider.enum'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /** 회원가입 */
  async localSave(req: CreateUserDto): Promise<User> {
    try {
      const hash = await bcrypt.hash(req.password, 13)
      const user = this.userRepository.create({
        email: req.id,
        password: hash,
        name: req.name,
        provider: Provider.LOCAL,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  async localLogin(id: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: id } })
      await this.compareBcrypt(password, user.password)
      return user
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  async kakaoLogin(req: KakaoDto): Promise<String> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { providerIdx: req.kakaoId },
      })
      if (findUser) return await this.gwtJwtWithIdx(findUser.idx)
      const saveUser = await this.kakaoSave(req)
      console.log(1, saveUser)
      return await this.gwtJwtWithIdx(saveUser.idx)
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  async kakaoSave(req: KakaoDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        email: req.email,
        name: req.name,
        provider: req.provider,
        providerIdx: req.kakaoId,
      })
      const saveUser = await this.userRepository.save(user)
      console.log(saveUser)
      return saveUser
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found!!', HttpStatus.BAD_REQUEST)
    }
  }

  async naverLogin(req: NaverDto) {
    try {
      const findUser = await this.getUserbyProviderIdx(req.naverId)
      if (findUser) return await this.gwtJwtWithIdx(findUser.idx)
      const saveUser = await this.naverSave(req)
      return await this.gwtJwtWithIdx(saveUser.idx)
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  async naverSave(req: NaverDto) {
    try {
      const user = this.userRepository.create({
        email: req.email,
        name: req.name,
        provider: req.provider,
        providerIdx: req.naverId,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  async gwtJwtWithIdx(idx: number) {
    return this.jwtService.sign({ idx })
  }

  async getUserbyProviderIdx(providerIdx: string) {
    return await this.userRepository.findOne({ where: { providerIdx } })
  }

  async getUserByIdx(idx: number) {
    return await this.userRepository.findOne({ where: { idx } })
  }

  async compareBcrypt(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash)
    if (!result)
      throw new HttpException('Password ERROR', HttpStatus.BAD_REQUEST)
  }
}
