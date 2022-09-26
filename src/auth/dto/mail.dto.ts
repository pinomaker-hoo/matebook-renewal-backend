import { IsString } from 'class-validator'

export class MailDto {
  @IsString()
  email: string
}
