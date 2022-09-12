import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Provider } from '../dto/user.provider.enum'

@Entity({ name: 'tbl_user' })
@Unique(['email'])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: 'varchar', length: 255 })
  email: string

  @Column({ nullable: true, type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ nullable: true })
  providerIdx: string

  @Column({ type: 'enum', enum: Provider })
  provider: Provider
}
