import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '210.90.136.10',
  port: 3306,
  username: 'pino',
  password: 'qwer1595',
  database: 'swyg',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
}
