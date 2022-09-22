import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_point' })
export class Point extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number
}
