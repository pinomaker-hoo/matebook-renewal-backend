import { IsString } from 'class-validator'

export class KakaoDto {
  @IsString()
  name: string

  @IsString()
  kakaoId: string

  @IsString()
  email: string

  @IsString()
  provider: string
}
