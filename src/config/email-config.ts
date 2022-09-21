export class EmailConfig {
  user: 'inhoo25@naver.com'
  password: 'wjd1127@!'
  async getRandomNumber() {
    let number = Math.floor(Math.random() * 1000000) + 100000
    if (number > 1000000) number -= 100000
    return number
  }
}
