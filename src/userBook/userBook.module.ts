import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserBookService } from './application/userBook.service'
import { UserBookRepository } from './infrastructure/userBook.repository'
import { UserBookController } from './ui/userBook.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserBookRepository])],
  providers: [UserBookService],
  controllers: [UserBookController],
})
export class UserBookModule {}
