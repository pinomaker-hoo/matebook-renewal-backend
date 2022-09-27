import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentService } from './application/comment.service'
import { CommentRepository } from './infrastructure/comment.repository'
import { CommentController } from './ui/comment.controller'

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
