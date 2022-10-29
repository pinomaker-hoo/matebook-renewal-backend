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
import { KakaoStrategy } from './passport/auth.kakao.strategy'
import { NaverStrategy } from './passport/auth.naver.strategy'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MateModule } from 'src/mate/mate.module'
import { male } from 'src/config/env/node'

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRoot({
      transport: {
        host: male.MALE_HOST,
        port: male.MALE_PORT,
        auth: {
          user: male.MALE_ID,
          pass: male.GOOGLE_KEY,
        },
        secure: true,
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    PassportModule,
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRESIN'),
        },
      }),
    }),
    MateModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    KakaoStrategy,
    NaverStrategy,
  ],
})

export class AuthModule {}
