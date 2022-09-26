import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Point } from 'src/point/domain/point.entity'
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_quiz' })
export class Quiz extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @OneToMany((type) => Point, (point) => point.quiz)
  point: Point
}
