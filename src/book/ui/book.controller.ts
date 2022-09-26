import { Controller } from '@nestjs/common'
import { BookService } from '../application/book.service'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
}
