import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { User } from 'src/auth/domain/user.entity'
import { Mate } from '../domain/mate.entity'
import { MateRepository } from '../infrastructure/mate.repository'

@Injectable()
export class MateService {
  constructor(private readonly mateRepository: MateRepository) {}

  async saveMate(user: User, name: string): Promise<Mate> {
    try {
      const mate: Mate = this.mateRepository.create({ user, name })
      return await this.mateRepository.save(mate)
    } catch (err) {
      console.log(err)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    }
  }
}
