import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Quiz } from 'src/quiz/domain/quiz.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_point' })
export class Point extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @ManyToOne((type) => Quiz, (quiz) => quiz.point)
  quiz: Quiz

  @ManyToOne((type) => User, (user) => user.point)
  user: User
}
