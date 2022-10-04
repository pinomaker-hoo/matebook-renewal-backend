import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_mate' })
export class Mate extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: 'varchar' })
  name: string

  @OneToOne((type) => User, (user) => user.mate)
  user: User
}
