import { IsString } from 'class-validator'
import { Provider } from './user.provider.enum'

export class NaverDto {
  @IsString()
  name: string

  @IsString()
  naverId: string

  @IsString()
  email: string

  @IsString()
  provider: Provider.NAVER
}
