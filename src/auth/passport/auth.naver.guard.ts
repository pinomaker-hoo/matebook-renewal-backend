import { AuthGuard } from '@nestjs/passport'

export class NaverGuard extends AuthGuard('naver') {}
