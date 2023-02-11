import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ApiResponse } from 'src/common/dto/api.response'
import { Book } from '../domain/book.entity'
import { BookSaveDto } from '../dto/book.save.dto'
import { BookRepository } from '../infrastructure/book.repository'

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  /**
   * Book 저장 함수
   * @param {BookSaveDto} req
   * @returns {Book}
   */
  async saveBook(req: BookSaveDto) {
    try {
      const findBook: Book[] = await this.bookRepository.find({ where: req.isbn })
      if (findBook.length > 0) return findBook[0]
      const book = this.bookRepository.create({
        title: req.title,
        contents: req.contents,
        publisher: req.publisher,
        authors: req.authors,
        thumbnail: req.thumbnail,
        isbn: req.isbn,
      })
      return ApiResponse.of({
        data: await this.bookRepository.save(book),
        message: 'Success Save Book',
        statusCode: 200,
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * BookIdx를 활용한 Book With review 조회 함수
   * @param {number}bookIdx
   * @returns {Book}
   */
  async findBookByIdxWithReview(bookIdx: number) {
    try {
      const book = await this.bookRepository.findOne({
        where: { idx: bookIdx },
        relations: ['review'],
      })
      if (book == null) {
        return ApiResponse.of({
          data: book,
          message: 'No Book Found',
          statusCode: 404,
        })
      }
      return ApiResponse.of({
        data: book,
        message: 'Success Find Book',
        statusCode: 200,
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * 원하는 개수의 Book List 조회 함수
   * @param {number}count
   * @returns {Book[]}
   */
  async findBookListCount(count: number) {
    try {
      const bookList: Book[] = await this.bookRepository.find()
      if (bookList.length == 0) {
        return ApiResponse.of({
          data: bookList,
          message: 'No BookList Found',
          statusCode: 404,
        })
      }
      return ApiResponse.of({
        data: bookList.sort(() => Math.random() - 0.5).slice(0, count),
        message: 'Success Find BookList',
        statusCode: 200,
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

    /**
   * Book List 조회 함수
   * @param {string} isbn
   * @returns {Book[]}
   */
    async findBookList(isbn: string) {
      try {
        return await this.bookRepository.find({ where: { isbn } })
      } catch (err) {
        console.log(err)
        throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
      }
    }

  /**
   * BookIdx를 이용한 Book 조회
   * @param {number} bookIdx
   * @returns {Book}
   */
  async findBookByIdx(bookIdx: number) {
    try {
      return await this.bookRepository.findOne({ where: { idx: bookIdx } })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * isbn 이용한 Book 조회
   * @param {string} isbn
   * @returns {Book}
   */
  async findBookByIsbn(isbn: string) {
    try {
      const book = await this.bookRepository.findOne({ where: { isbn } })
      if (book == null) {
        return ApiResponse.of({
          data: book,
          message: 'No Book Found',
          statusCode: 404,
        })
      }
      return ApiResponse.of({
        data: book,
        message: 'Success Find Book',
        statusCode: 200,
      })
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
