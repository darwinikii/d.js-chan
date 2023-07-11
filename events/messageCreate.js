import DiscordJS from 'discord.js'

import { log, config } from '../src/functions.js'

export const structure = {
  event: 'messageCreate',
  once: false
}

export function run (client, message) {
  if (message.author.bot) return
  if (message.channel.type === DiscordJS.ChannelType.DM) return

  const prefix = config().prefix || '!'

  if (!message.content.startsWith(prefix)) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)

  const commandInput = args.shift()

  if (!commandInput.length) return

  let command = client.prefixCommands.commands.get(commandInput)
  if (!command) command = client.prefixCommands.commands.get(client.prefixCommands.aliases.get(commandInput))
  if (!command) return

  command.executePrefix(client, message, args)
}
