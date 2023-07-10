import DiscordJS from 'discord.js'

import { log } from '../src/functions.js'

export const structure = {
  event: 'interactionCreate',
  once: false
}

export function run (client, interaction) {
  const command = client.interactionCommands.list.get(
    interaction.commandName ||
    client.interactionCommands.customIDs.get(interaction.customId.includes('@*@')
      ? interaction.customId.split('@*@')[0]
      : interaction.customId)
  )

  if (!command) {
    console.log(interaction)
    console.log(interaction.customId)
    return
  }

  if (interaction.isChatInputCommand()) {
    command.executeSlash(client, interaction)
  } else if (interaction.isUserContextMenuCommand()) {
    command.executeUser(client, interaction)
  } else if (interaction.isMessageContextMenuCommand()) {
    command.executeMessage(client, interaction)
  } else if (interaction.isButton()) {
    command.executeButton(
      client,
      interaction,
      interaction.customId.split('@*@')[1]
    )
  } else if (interaction.isAnySelectMenu()) {
    command.executeMenu(
      client,
      interaction,
      interaction.customId.includes('@*@')
        ? interaction.customId.split('@*@')[1]
        : undefined
    )
  } else if (interaction.isModalSubmit()) {
    command.executeModal(
      client,
      interaction,
      interaction.customId.includes('@*@')
        ? interaction.customId.split('@*@')[1]
        : undefined
    )
  } else {
    console.log(interaction)
  }
}
