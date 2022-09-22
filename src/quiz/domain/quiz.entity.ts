import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_quiz' })
export class Quiz extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number
}
