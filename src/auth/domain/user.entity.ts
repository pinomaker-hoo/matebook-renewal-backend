import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity({ name: 'tbl_user' })
@Unique(['id'])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: 'varchar', length: 100 })
  id: string

  @Column({ type: 'varchar', length: 150 })
  password: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 100 })
  number: string
}
