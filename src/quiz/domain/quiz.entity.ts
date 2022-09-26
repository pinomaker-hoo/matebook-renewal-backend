import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Point } from 'src/point/domain/point.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { QuizKind } from '../dto/quiz.kind.enum'

@Entity({ name: 'tbl_quiz' })
export class Quiz extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  text: string

  @Column()
  answer: boolean

  @Column()
  kind: QuizKind

  @OneToMany((type) => Point, (point) => point.quiz)
  point: Point

  @OneToMany((type) => User, (user) => user.quiz)
  user: User
}
