import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_mate' })
export class Mate extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number
}
