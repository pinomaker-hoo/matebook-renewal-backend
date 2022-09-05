import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from '../infrastructure/user.repository'
import * as bcrypt from 'bcryptjs'
import { User } from '../domain/user.entity'
import { CreateUserDto } from '../dto/user.create.dto'
import { JwtService } from '@nestjs/jwt'
import { KakaoDto } from '../dto/passport.kakao.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async save(req: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(req.password, 13)
    const user = this.userRepository.create({
      email: req.id,
      password: hash,
      name: req.name,
      number: req.number,
      provider: 'local',
    })
    return await this.userRepository.save(user)
  }

  async login(id: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: id } })
      await this.compareBcrypt(password, user.password)
      return user
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  async jwtWithCookie(userId: number) {
    const token = this.jwtService.sign({ userId })
    return token
  }

  async getUserByIdx(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { idx: userId } })
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    return user
  }

  async compareBcrypt(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash)
    if (!result)
      throw new HttpException('Password ERROR', HttpStatus.BAD_REQUEST)
  }

  async kakaoLogin(req: KakaoDto): Promise<{ accessToken: string }> {
    const user = await this.kakaoSave(req)
    return { accessToken: await this.jwtWithCookie(user.idx) }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } })
  }

  async kakaoSave(req: KakaoDto) {
    const findUser = await this.findByEmail(req.email)
    if (findUser) return findUser
    const hash = await bcrypt.hash(req.kakaoId, 13)
    const user = this.userRepository.create({
      email: req.email,
      password: hash,
      name: req.name,
      provider: req.provider,
    })
    return await this.userRepository.save(user)
  }
}
