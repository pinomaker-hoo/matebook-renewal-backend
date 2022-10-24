import { Controller } from '@nestjs/common'
import { LikeBookService } from '../application/likeBook.service'

@Controller('likeBook')
export class LikeBookController {
  constructor(private readonly likeBookService: LikeBookService) {}
}
