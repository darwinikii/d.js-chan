import DiscordJS from 'discord.js'
import colors from 'colors'
import path from 'path'
import fs from 'fs'

import handle from '../clientHandler.js'
import { log, config } from '../functions.js'

export default class extends DiscordJS.Client {
  interactionCommands = {
    list: new DiscordJS.Collection(),
    customIDs: new DiscordJS.Collection(),
    cache: []
  }

  prefixCommands = {
    commands: new DiscordJS.Collection(),
    aliases: new DiscordJS.Collection()
  }

  handledBefore = false

  constructor () {
    super({
      intents: [
        DiscordJS.GatewayIntentBits.Guilds,
        DiscordJS.GatewayIntentBits.GuildMessages,
        DiscordJS.GatewayIntentBits.GuildPresences,
        DiscordJS.GatewayIntentBits.GuildMessageReactions,
        DiscordJS.GatewayIntentBits.DirectMessages,
        DiscordJS.GatewayIntentBits.MessageContent
      ],
      partials: [
        DiscordJS.Partials.Channel,
        DiscordJS.Partials.Message,
        DiscordJS.Partials.User,
        DiscordJS.Partials.GuildMember,
        DiscordJS.Partials.Reaction
      ]
    })
  };

  start = async (token) => {
    log('Starting Discord Bot', 'info')
    if (config().webServer === true) {
      const server = (await import('http')).createServer((req, res) => res.end('Ready.')).listen()
      log('Starting Web Server at http://localhost:' + server.address().port)
    }
    await handle(this, token || config().TOKEN || process.env.CLIENT_TOKEN)
  }

  stop = async () => {
    log('Stopping Discord Bot', 'info')
    await this.destroy()
    log('Stopped Discord Bot', 'done')
  }
};
