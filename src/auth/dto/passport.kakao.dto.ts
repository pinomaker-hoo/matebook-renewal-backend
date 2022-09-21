import { IsBoolean, IsDate, IsString } from 'class-validator'
import { Provider } from './user.provider.enum'

export class KakaoDto {
  @IsString()
  name: string

  @IsString()
  kakaoId: string

  @IsString()
  email: string

  @IsDate()
  birth: Date

  // @IsBoolean()
  // male: boolean

  @IsString()
  provider: Provider.KAKAO
}
