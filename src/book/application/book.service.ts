import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Book } from '../domain/book.entity'
import { BookSaveDto } from '../dto/book.save.dto'
import { BookRepository } from '../infrastructure/book.repository'

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async saveBook(req: BookSaveDto) {
    try {
      const findBook = await this.findBook(req.isbn)
      if (findBook.length > 0) return findBook
      const book = this.bookRepository.create({
        title: req.title,
        contents: req.contents,
        publisher: req.publisher,
        authors: req.authors,
        thumbnail: req.thumbnail,
        isbn: req.isbn,
      })
      return await this.bookRepository.save(book)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async findBook(isbn: string) {
    try {
      return await this.bookRepository.find({ where: { isbn } })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async findBookList() {
    try {
      return await this.bookRepository.findOne()
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async findBookByIdx(bookIdx: number) {
    try {
      return await this.bookRepository.findOne({
        where: { idx: bookIdx },
        relations: ['review'],
      })
    } catch (err) {
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async findBookListCount(count: number) {
    try {
      const bookList: Book[] = await this.bookRepository.find()
      return bookList.slice(0, count)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  async findBookByIdxForQuiz(bookIdx: number) {
    try {
      return await this.bookRepository.findOne({ where: { idx: bookIdx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
