import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { BookService } from 'src/book/application/book.service'
import { Book } from 'src/book/domain/book.entity'
import { UserBook } from '../domain/userBook.entity'
import { UserBookRepository } from '../infrastructure/userBook.repository'

@Injectable()
export class UserBookService {
  constructor(
    private readonly userBookRepository: UserBookRepository,
    private readonly bookService: BookService,
  ) {}
  async saveUserBook(user: User, bookIdx: number) {
    try {
      const book: Book = await this.bookService.findBookByIdx(bookIdx)
      const readBook: UserBook = await this.findUserBookByBookIdx(book.idx)
      if (readBook) return readBook
      const saveBook: UserBook = this.userBookRepository.create({
        user,
        book,
      })
      return await this.userBookRepository.save(saveBook)
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  async findUserBookByBookIdx(idx: number) {
    try {
      return await this.userBookRepository.findOne({ where: { book: idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }

  async findUserBookListByUserIdx(user: User) {
    try {
      return await this.userBookRepository.find({ where: { user: user.idx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }
}
