import DiscordJS from 'discord.js'
import moment from 'moment'
import 'moment-duration-format'

import CustomIDBuilder from '../src/class/CustomIDBuilder.js'

export const structure = {
  data: new DiscordJS.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong🏓'),
  user: new DiscordJS.ContextMenuCommandBuilder()
    .setName('ping'),
  message: new DiscordJS.ContextMenuCommandBuilder()
    .setName('ping'),
  type: [0, 1, 4], // "0 is Prefix, 1 is Slash, 2 is User, 3 is Message, 4 is Component"
  aliases: [],
  customIDs: ['ping']
}

export async function executePrefix (client, message, args) {
  const row = new DiscordJS.ActionRowBuilder()
    .addComponents(
      new DiscordJS.ButtonBuilder()
        .setCustomId(CustomIDBuilder('ping', 'expand'))
        .setLabel('GOD MODE')
        .setStyle(DiscordJS.ButtonStyle.Danger)
    )
  await message.reply({ content: 'Pong! 🏓', components: [row] })
}

export async function executeSlash (client, interaction) {
  const row = new DiscordJS.ActionRowBuilder()
    .addComponents(
      new DiscordJS.ButtonBuilder()
        .setCustomId(CustomIDBuilder('ping', 'expand'))
        .setLabel('GOD MODE')
        .setStyle(DiscordJS.ButtonStyle.Danger)
    )
  await interaction.reply({ content: 'Pong! 🏓', components: [row] })
}

export async function executeUser (client, interaction) {

}

export async function executeMessage (client, interaction) {

}

export async function executeButton (client, interaction, args) {
  if (args === 'expand') {
    const row = new DiscordJS.ActionRowBuilder()
      .addComponents(
        new DiscordJS.ButtonBuilder()
          .setCustomId(CustomIDBuilder('ping', 'shorten'))
          .setLabel('Basic Mode')
          .setStyle(DiscordJS.ButtonStyle.Primary)
      )

    const embed = new DiscordJS.EmbedBuilder()
      .setTitle('Pong! 🏓')
      .addFields(
        { name: 'Ping:', value: Math.abs(Date.now() - interaction.createdTimestamp) + 'ms', inline: true },
        { name: 'API Ping:', value: client.ws.ping === -1 ? 'N/A' : Math.round(client.ws.ping) + 'ms', inline: true },
        { name: 'Servers:', value: client.guilds.cache.size.toString(), inline: true },
        { name: 'Users:', value: client.users.cache.size.toString(), inline: true },
        { name: 'Uptime:', value: moment.duration(client.uptime).format('D [d], H [h], m [min], s [sec]'), inline: true },
        { name: 'RAM:', value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', inline: true },
        { name: 'Discord.js & Node.js version:', value: `${DiscordJS.version} & ${process.version}` }
      )
      .setFooter({ text: interaction.member.user.username, iconURL: interaction.member.user.avatarURL() })
      .setTimestamp(Date.now())

    interaction.update({ content: null, embeds: [embed], components: [row] })
  } else {
    const row = new DiscordJS.ActionRowBuilder()
      .addComponents(
        new DiscordJS.ButtonBuilder()
          .setCustomId(CustomIDBuilder('ping', 'expand'))
          .setLabel('GOD MODE')
          .setStyle(DiscordJS.ButtonStyle.Danger)
      )
    interaction.update({ content: 'Pong! 🏓', embeds: [], components: [row] })
  }
};

export async function executeMenu (client, interaction, args) {

};

export async function executeModal (client, interaction, args) {

}
