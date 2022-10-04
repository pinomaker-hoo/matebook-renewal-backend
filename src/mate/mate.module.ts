import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MateService } from './application/mate.service'
import { MateRepository } from './infrastructure/mate.repository'
import { MateController } from './ui/mate.controller'

@Module({
  imports: [TypeOrmModule.forFeature([MateRepository])],
  providers: [MateService],
  controllers: [MateController],
})
export class MateModule {}
