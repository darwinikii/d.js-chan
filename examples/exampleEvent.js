import DiscordJS from 'discord.js'

import { log } from '../src/functions.js'

export const structure = {
  event: 'customEvent',
  once: false
}

export function run (client, m) {
  log('Custom event is worked nice', 'done')
}
