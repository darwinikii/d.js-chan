import DiscordJS from 'discord.js'

import { Logger } from '../src/functions.js'

export const structure = {
  event: DiscordJS.Events.ClientReady,
  once: false
}

export function run (client) {
  Logger.done('Client successfully connected to Discord')
}
