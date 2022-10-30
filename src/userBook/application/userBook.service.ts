import { Injectable } from '@nestjs/common'
import { UserBookRepository } from '../infrastructure/userBook.repository'

@Injectable()
export class UserBookService {
  constructor(private readonly userBookRepository: UserBookRepository) {}
}
