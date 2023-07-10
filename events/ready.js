import DiscordJS from 'discord.js'

import { log } from '../src/functions.js'

export const structure = {
  event: 'ready',
  once: false
}

export function run (client, m) {
  log('Client successfully connected to Discord', 'done')
}
