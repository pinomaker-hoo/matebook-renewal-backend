import * as bcrypt from 'bcryptjs'

export class BcryptUtils {
  static async encode(password: string): Promise<{}> {
    const salt = await bcrypt.genSalt()
    return { hash: await bcrypt.hash(password, salt), salt }
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
