import DiscordJS from 'discord.js'

import { log } from '../src/functions.js'

export const structure = {
  event: 'exampleEvent',
  once: false
}

export function run (client) {
  log('Example event is worked nice', 'done')
}
