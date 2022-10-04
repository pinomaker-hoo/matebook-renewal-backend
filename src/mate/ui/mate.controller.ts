import { Controller } from '@nestjs/common'
import { MateService } from '../application/mate.service'

@Controller('mate')
export class MateController {
  constructor(private readonly mateService: MateService) {}
}
