import { Body, Controller, Get, Param, Post } from '@nestjs/common'
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
  async findBookList() {
    return await this.bookService.findBookList()
  }

  @Get('/:id')
  async findBook(@Param('id') idx: string) {
    return await this.bookService.findBookByIdx(Number(idx))
  }

  @Get('/count/:id')
  async findBookListCount(@Param('id') idx: string) {
    return await this.bookService.findBookListCount(Number(idx))
  }
}
