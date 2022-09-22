import { Injectable } from '@nestjs/common'
import { PointRepository } from '../infrastructure/point.repository'

@Injectable()
export class PointService {
  constructor(private readonly pointRepository: PointRepository) {}
}
