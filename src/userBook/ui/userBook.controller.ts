import { Controller } from '@nestjs/common'
import { UserBookService } from '../application/userBook.service'

@Controller('userBook')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}
}
