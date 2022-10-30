import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserRepository } from '../infrastructure/user.repository'
import * as bcrypt from 'bcryptjs'
import { User } from '../domain/user.entity'
import { CreateUserDto } from '../dto/user.create.dto'
import { JwtService } from '@nestjs/jwt'
import { KakaoDto } from '../dto/passport.kakao.dto'
import { NaverDto } from '../dto/passport.naver.dto'
import { Provider } from '../dto/user.provider.enum'
import { MailerService } from '@nestjs-modules/mailer'
import { male } from 'src/config/env/node'
import { encode } from 'node-base64-image'

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /** Local 회원가입 */
  async localSave(req: CreateUserDto): Promise<User> {
    try {
      const hash = await bcrypt.hash(req.password, 8)
      const user = this.userRepository.create({
        email: req.email,
        password: hash,
        name: req.name,
        birth: req.birth,
        male: req.male,
        provider: Provider.LOCAL,
        providerIdx: null,
        imgPath: null,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  /** Local 로그인 */
  async localLogin(email: string, password: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } })
      await this.compareBcrypt(password, user.password)
      return user
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  /** Kakao Login(Passport) */
  async kakaoLogin(req: KakaoDto): Promise<User> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { providerIdx: req.kakaoId },
      })
      if (findUser) return findUser
      return await this.kakaoSave(req)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  /** Kakao Save -> Kakao Login에서 호출 */
  async kakaoSave(req: KakaoDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        email: req.email,
        name: req.name,
        provider: req.provider,
        providerIdx: req.kakaoId,
        birth: null,
        password: null,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found!!', HttpStatus.BAD_REQUEST)
    }
  }

  /** Naver Login(Passport) */
  async naverLogin(req: NaverDto): Promise<User> {
    try {
      const findUser = await this.getUserbyProviderIdx(req.naverId)
      if (findUser) return findUser
      return await this.naverSave(req)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  /** Naver Save(Passport) */
  async naverSave(req: NaverDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        email: req.email,
        name: req.name,
        provider: req.provider,
        providerIdx: req.naverId,
        male: null,
        birth: null,
        password: null,
      })
      return await this.userRepository.save(user)
    } catch (err) {
      console.log(err)
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST)
    }
  }

  /** Jwt를 이용하여 Token 발급 */
  async gwtJwtWithIdx(idx: number) {
    return this.jwtService.sign({ idx })
  }

  /** providerIdx를 이용한 User 조회 */
  async getUserbyProviderIdx(providerIdx: string) {
    return await this.userRepository.findOne({ where: { providerIdx } })
  }

  /** idx를 이용한 User 조회 */
  async getUserByIdx(idx: number) {
    return await this.userRepository.findOne({ where: { idx } })
  }

  async getHashAndSalt(password: string, salt: number): Promise<string> {
    return await bcrypt.hash(password, salt)
  }

  /** Bcrypt를 이용한 Hash 풀가 */
  async compareBcrypt(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash)
    if (!result)
      throw new HttpException('Password ERROR', HttpStatus.BAD_REQUEST)
  }

  /** Local Login Send Mail Code */
  async sendMail(email: string) {
    try {
      const number: number = await this.getRandomNumber()
      await this.mailerService.sendMail({
        to: email,
        from: male.MALE_ID,
        subject: '이메일 인증 요청 메일입니다.',
        html: '6자리 인증 코드 : ' + `<b> ${number}</b>`,
      })
      return number
    } catch (err) {
      console.log(err)
    }
  }

  async getRandomNumber() {
    let number = Math.floor(Math.random() * 1000000) + 100000
    if (number > 1000000) number -= 100000
    return number
  }

  async updateImg(user: User, image: string) {
    try {
      const updateUser = await this.userRepository.update(user.idx, {
        imgPath: image,
      })
      return updateUser
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async ImgToBase(image: string) {
    try {
      const decode = await encode(`../../../${image}`)
    } catch (err) {
      console.log(err)
    }
  }
}
// async saveForm(user: User, image: string, number: string) {
//   try {
//     const form: Form = this.formRepository.create({ user, image, number })
//     return await this.formRepository.save(form)
//   } catch (err) {
//     console.log(err)
//     throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
//   }
// }
