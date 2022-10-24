import { Injectable } from '@nestjs/common'
import { LikeBookRepository } from '../infrastructure/likeBook.repository'

@Injectable()
export class LikeBookService {
  constructor(private readonly likeBookRepository: LikeBookRepository) {}
}
