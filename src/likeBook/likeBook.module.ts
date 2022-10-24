import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LikeBookService } from './application/likeBook.service'
import { LikeBookRepository } from './infrastructure/likeBook.repository'
import { LikeBookController } from './ui/likeBook.controller'

@Module({
  imports: [TypeOrmModule.forFeature([LikeBookRepository])],
  providers: [LikeBookService],
  controllers: [LikeBookController],
})
export class LikeBookModule {}
