import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
import { typeORMConfig } from './config/typeorm.config'
import { PointModule } from './point/point.module'
import { QuizModule } from './quiz/quiz.module'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot(),
    PointModule,
    QuizModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
 