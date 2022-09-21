import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { typeORMConfig } from './config/typeorm.config'

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeORMConfig), ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
