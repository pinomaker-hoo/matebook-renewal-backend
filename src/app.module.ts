import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
import { CommentModule } from './comment/comment.module'
import { typeORMConfig } from './config/typeorm.config'
import { PointModule } from './point/point.module'
import { QuizModule } from './quiz/quiz.module'
import { ReviewModule } from './review/review.module'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot(),
    PointModule,
    QuizModule,
    BookModule,
    ReviewModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
