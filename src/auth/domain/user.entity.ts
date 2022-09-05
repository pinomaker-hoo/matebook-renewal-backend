import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity({ name: 'tbl_user' })
@Unique(['email'])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: 'varchar', length: 255 })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 255 })
  number: string

  @Column({ type: 'varchar', length: 255 })
  provider: string
}
