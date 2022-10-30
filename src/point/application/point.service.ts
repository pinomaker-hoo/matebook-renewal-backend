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

  async getPoint(user: User) {
    try {
      const point: Point[] = await this.pointRepository.find({
        where: { user: user.idx },
      })
      let sumPoint: number = 0
      for (const item of point) {
        sumPoint += item.point
      }
      return sumPoint
    } catch (err) {
      console.log(err)
      throw new HttpException('ERROR', HttpStatus.BAD_REQUEST)
    }
  }
}
