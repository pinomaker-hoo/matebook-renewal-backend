import { Injectable } from '@nestjs/common'
import { MateRepository } from '../infrastructure/mate.repository'

@Injectable()
export class MateService {
  constructor(private readonly mateRepository: MateRepository) {}
}
