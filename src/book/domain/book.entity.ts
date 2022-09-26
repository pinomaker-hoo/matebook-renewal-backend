import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_name' })
export class Book extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  name: string
}
