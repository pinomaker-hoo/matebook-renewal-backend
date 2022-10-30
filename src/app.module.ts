import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
import { CommentModule } from './comment/comment.module'
import { LikeBookModule } from './likeBook/likeBook.module'
import { MateModule } from './mate/mate.module'
import { PointModule } from './point/point.module'
import { QuizModule } from './quiz/quiz.module'
import { ReviewModule } from './review/review.module'
import { ReviewLikeModule } from './reviewLike/reviewLike.module'
import { UserBookModule } from './userBook/userBook.module'

@Module({
  imports: [
    BookModule,
    PointModule,
    QuizModule,
    ReviewModule,
    CommentModule,
    ReviewLikeModule,
    LikeBookModule,
    MateModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    AuthModule,
    UserBookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
