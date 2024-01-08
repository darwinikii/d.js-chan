import 'colors'

export class Logger {
  static info(str) {
    console.log(('[INFO] ' + str).blue)
  }

  static error(str) {
    console.log(('[ERROR] ' + str).red)
  }

  static warn(str) {
    console.log(('[WARNING] ' + str).yellow)
  }

  static done(str) {
    console.log(('[SUCCESS] ' + str).green)
  }

  static debug(str) {
    console.log(('[DEBUG] ' + str).bgYellow)
  }
}