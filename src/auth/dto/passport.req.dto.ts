import { User } from '../domain/user.entity'
import { Request } from 'express'

export default interface ReqWithUser extends Request {
  user: User
}
