import { Module } from '@nestjs/common'
import { AuthController } from './ui/auth.controller'
import { AuthService } from './application/auth.service'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './infrastructure/user.repository'
import { LocalStrategy } from './passport/auth.local.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './passport/auth.jwt.strategy'
import { GoogleStrategy } from './passport/auth.google.strategy'
import { KakaoStrategy } from './passport/auth.kakao.strategy'

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserRepository]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: 'swyg3',
        signOptions: {
          expiresIn: '2h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, KakaoStrategy],
})
export class AuthModule {}
