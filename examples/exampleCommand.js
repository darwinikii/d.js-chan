import DiscordJS from 'discord.js'

import CustomIDBuilder from '../src/class/CustomIDBuilder.js'

export const structure = {
  data: new DiscordJS.SlashCommandBuilder()
    .setName('examplecommand')
    .setDescription('Is D.JS-chan perfect?'),
  user: new DiscordJS.ContextMenuCommandBuilder()
    .setName('examplecommand'),
  message: new DiscordJS.ContextMenuCommandBuilder()
    .setName('examplecommand'),
  type: [0, 1, 4], // "0 is Prefix, 1 is Slash, 2 is User, 3 is Message, 4 is Component"
  aliases: [],
  customIDs: ['examplecommand']
}

export async function executePrefix (client, message, args) {
  const row = new DiscordJS.ActionRowBuilder()
    .addComponents(
      new DiscordJS.ButtonBuilder()
        .setCustomId(CustomIDBuilder('examplecommand', 'yes'))
        .setLabel('Yes')
        .setStyle(DiscordJS.ButtonStyle.Primary),
      new DiscordJS.ButtonBuilder()
        .setCustomId(CustomIDBuilder('examplecommand', 'no'))
        .setLabel('No')
        .setStyle(DiscordJS.ButtonStyle.Danger)
    )
  await message.reply({ content: 'Is D.JS-chan perfect?', components: [row] })
}

export async function executeSlash (client, interaction) {
  const row = new DiscordJS.ActionRowBuilder()
    .addComponents(
      new DiscordJS.ButtonBuilder()
        .setCustomId(CustomIDBuilder('examplecommand', 'yes'))
        .setLabel('Yes')
        .setStyle(DiscordJS.ButtonStyle.Primary),
      new DiscordJS.ButtonBuilder()
        .setCustomId(CustomIDBuilder('examplecommand', 'no'))
        .setLabel('No')
        .setStyle(DiscordJS.ButtonStyle.Danger)
    )
  await interaction.reply({ content: 'Is D.JS-chan perfect?', components: [row] })
}

export async function executeUser (client, interaction, target) {

}

export async function executeMessage (client, interaction, target) {

}

export async function executeButton (client, interaction, customID, args) {
  if (args === 'yes') {
    interaction.reply({ content: "You are right 👍", ephemeral: true })
  } else {
    interaction.reply({ content: 'Go learn python 👎', ephemeral: true })
  }
}

export async function executeMenu (client, interaction, customID, args) {

}

export async function executeModal (client, interaction, customID, args) {

}
