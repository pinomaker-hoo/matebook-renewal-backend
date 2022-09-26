import { Injectable } from '@nestjs/common'
import { BookRepository } from '../infrastructure/book.repository'

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}
}
