import { BaseTimeEntity } from 'src/common/entity/BaseTime.Entity'
import { Review } from 'src/review/domain/review.entity'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity({ name: 'tbl_book' })
@Unique(['isbn'])
export class Book extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  title: string

  @Column()
  isbn: string

  @Column({ type: 'mediumblob' })
  contents: string

  // @Column()
  // datetime: Date

  @Column()
  authors: string

  @Column()
  publisher: string

  @Column()
  thumbnail: string

  @OneToMany((type) => Review, (review) => review.book)
  review: Review[]
}
