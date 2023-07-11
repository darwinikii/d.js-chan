import colors from 'colors'
import path from 'path'
import fs from 'fs'

export function log (str, sty) {
  switch (sty) {
    case 'info': {
      console.log(('[INFO] ' + str).blue)
      break
    }
    case 'err': {
      console.log(('[ERROR] ' + str).red)
      break
    }
    case 'warn': {
      console.log(('[WARNING] ' + str).yellow)
      break
    }
    case 'done': {
      console.log(('[SUCCESS] ' + str).green)
      break
    }
    default: if (config().logging === true) {
      console.log(('[DEBUG] ' + str).bgYellow)
      break
    }
  };
};

export function config () {
  let config
  try {
    config = fs.readFileSync(path.join('./', 'config.json'), 'utf8')
    config = config ? JSON.parse(config) : {}
  } catch (e) {
    if (e.errno === -4058) console.warn('[CRASH] Config is required for Discord bot! Create config.json file.'.red)
    else console.warn(('[CRASH] ' + e.message + ' ' + (e.name ? e.name : '') + ' ' + (e.path ? e.path : '')).red)
    process.exit(1)
  }
  return config
}
