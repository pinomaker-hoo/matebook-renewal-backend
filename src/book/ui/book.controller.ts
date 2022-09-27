import { Body, Controller, Get, Post } from '@nestjs/common'
import { BookService } from '../application/book.service'
import { BookSaveDto } from '../dto/book.save.dto'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async saveBook(@Body() req: BookSaveDto) {
    return await this.bookService.saveBook(req)
  }

  @Get()
  async test() {
    return 'Hello world'
  }
}
