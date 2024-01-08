import DiscordJS from 'discord.js'

import { Logger } from '../src/functions.js'

export const structure = {
  event: DiscordJS.Events.MessageCreate,
  once: false
}

export function run (client, message) {
  if (message.author.bot) return
  if (message.channel.type === DiscordJS.ChannelType.DM) return

  const prefix = client.options.prefix || '!'

  if (!message.content.startsWith(prefix)) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)

  const commandInput = args.shift()

  if (!commandInput.length) return

  let command = client.commands.prefixCommands.commands.get(commandInput)
  if (!command) command = client.commands.prefixCommands.commands.get(client.prefixCommands.aliases.get(commandInput))
  if (!command) return

  command.executePrefix(client, message, args)
}
