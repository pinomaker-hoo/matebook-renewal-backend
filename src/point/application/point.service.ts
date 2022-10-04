import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { PointRepository } from '../infrastructure/point.repository'
import { Point } from '../domain/point.entity'

@Injectable()
export class PointService {
  constructor(private readonly pointRepository: PointRepository) {}
  async savePoint(user: User, point: number): Promise<Point> {
    try {
      const savePoint: Point = this.pointRepository.create({ user, point })
      return await this.pointRepository.save(savePoint)
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
