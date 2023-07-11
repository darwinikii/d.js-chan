import DiscordJS from 'discord.js'
import moment from 'moment'
import 'moment-duration-format'

import CustomIDBuilder from '../src/class/CustomIDBuilder.js'

export const structure = {
  data: new DiscordJS.SlashCommandBuilder()
    .setName('example')
    .setDescription('Example Command'),
  user: new DiscordJS.ContextMenuCommandBuilder()
    .setName('example')
    .setType(2),
  message: new DiscordJS.ContextMenuCommandBuilder()
    .setName('example')
    .setType(3),
  type: [0, 1, 2, 3, 4], // "0 is Prefix, 1 is Slash, 2 is User, 3 is Message, 4 is Component"
  aliases: ['exampleAlias', 'newExampleAlias'],
  customIDs: ['exampleButton', 'exampleMenu', 'exampleModal']
}

export async function executePrefix (client, message, args) {
  const row = new DiscordJS.ActionRowBuilder()
    .addComponents(
      new DiscordJS.ButtonBuilder()
        .setCustomId(CustomIDBuilder('exampleButton', 'test'))
        .setLabel('click me')
        .setStyle(DiscordJS.ButtonStyle.Primary)
    )

  const row2 = new DiscordJS.ActionRowBuilder()
    .addComponents(
      new DiscordJS.UserSelectMenuBuilder()
        .setCustomId(CustomIDBuilder('exampleMenu', 'userSelect'))
        .setMaxValues(10)
    )

  await message.reply({ content: 'You run prefix example command', components: [row, row2] })
}

export async function executeSlash (client, interaction) {
  const row = new DiscordJS.ActionRowBuilder()
    .addComponents(
      new DiscordJS.ButtonBuilder()
        .setCustomId(CustomIDBuilder('exampleButton', 'test'))
        .setLabel('click me')
        .setStyle(DiscordJS.ButtonStyle.Primary)
    )

  const row2 = new DiscordJS.ActionRowBuilder()
    .addComponents(
      new DiscordJS.UserSelectMenuBuilder()
        .setCustomId(CustomIDBuilder('exampleMenu', 'userSelect'))
        .setMaxValues(10)
    )

  await interaction.reply({ content: 'You run slash example command', components: [row, row2] })
}

export async function executeUser (client, interaction) {
  await interaction.reply({ content: 'You runned user context example command' })
}

export async function executeMessage (client, interaction) {
  await interaction.reply({ content: 'You run message context example command' })
}

export async function executeButton (client, interaction, args) {
  const modal = new DiscordJS.ModalBuilder()
    .setCustomId(CustomIDBuilder('exampleModal', 'test'))
    .setTitle('My Modal')

  const hobbiesInput = new DiscordJS.TextInputBuilder()
    .setCustomId('hobbiesInput')
    .setLabel('you runned a button command how do you feel?')
    .setStyle(DiscordJS.TextInputStyle.Paragraph)

  const secondActionRow = new DiscordJS.ActionRowBuilder().addComponents(hobbiesInput)

  modal.addComponents(secondActionRow)

  await interaction.showModal(modal)
};

export async function executeMenu (client, interaction, args) {
  await interaction.reply({ content: 'You run menu example command' })
};

export async function executeModal (client, interaction, args) {
  await interaction.reply({ content: 'You run modal example command' })
}
