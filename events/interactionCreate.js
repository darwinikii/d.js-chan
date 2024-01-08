import DiscordJS from 'discord.js'

import { Logger } from '../src/functions.js'

export const structure = {
  event: DiscordJS.Events.InteractionCreate,
  once: false
}

export function run (client, interaction) {
  const command = client.commands.interactionCommands.list.get(
    interaction.commandName ||
    client.commands.interactionCommands.customIDs.get(interaction.customId.includes('@*@')
      ? interaction.customId.split('@*@')[0]
      : interaction.customId)
  )

  if (!command) return Logger.warn('Someone tried to run a undefined command : ' + (interaction.commandName || interaction.customId))

  if (interaction.isChatInputCommand()) {
    command.executeSlash(client, interaction)
  } else if (interaction.isUserContextMenuCommand()) {
    command.executeUser(client, interaction, interaction.targetMember)
  } else if (interaction.isMessageContextMenuCommand()) {
    command.executeMessage(client, interaction, interaction.targetMessage)
  } else if (interaction.isButton()) {
    command.executeButton(
      client,
      interaction,
      interaction.customId,
      interaction.customId.includes('@*@')
        ? interaction.customId.split('@*@')[1]
        : undefined
    )
  } else if (interaction.isAnySelectMenu()) {
    command.executeMenu(
      client,
      interaction,
      interaction.customId,
      interaction.customId.includes('@*@')
        ? interaction.customId.split('@*@')[1]
        : undefined
    )
  } else if (interaction.isModalSubmit()) {
    command.executeModal(
      client,
      interaction,
      interaction.customId,
      interaction.customId.includes('@*@')
        ? interaction.customId.split('@*@')[1]
        : undefined
    )
  } else {
    console.log(interaction)
  }
}
