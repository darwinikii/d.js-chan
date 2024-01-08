import DiscordJS from 'discord.js'
import Database from './Database.js'
import Handler from './Handler.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))
import { Logger } from '../functions.js'

export default class extends DiscordJS.Client {
  commands = {
    interactionCommands: {
      list: new DiscordJS.Collection(),
      customIDs: new DiscordJS.Collection(),
      cache: []
    },
    prefixCommands: {
      commands: new DiscordJS.Collection(),
      aliases: new DiscordJS.Collection()
    },
    load: async () => {
      Logger.info('Loading commands')
      for (const command of fs.readdirSync(process.cwd() + '/commands')) {
        const module = await import(path.relative(__dirname, path.resolve("commands", command)))
        const name = module.structure.data.name || module.structure.user.name || module.structure.message.name

        module.structure.type.forEach(e => {
          if (e === 0) {
            this.commands.prefixCommands.commands.set(module.structure.data.name, module)
            module.structure.aliases.forEach(e => {
              this.commands.prefixCommands.aliases.set(e, module.structure.data.name)
            })
            Logger.info('Loaded new prefix command: ' + module.structure.data.name)
          } else if (e === 1) {
            this.commands.interactionCommands.list.set(module.structure.data.name, module)
            this.commands.interactionCommands.cache.push(module.structure.data)
            Logger.info('Loaded new interaction command: ' + module.structure.data.name)
          } else if (e === 2) {
            module.structure.user.type = 2
            this.commands.interactionCommands.list.set(module.structure.user.name, module)
            this.commands.interactionCommands.cache.push(module.structure.user)
            Logger.info('Loaded new user command: ' + module.structure.user.name)
          } else if (e === 3) {
            module.structure.user.type = 3
            this.commands.interactionCommands.list.set(module.structure.message.name, module)
            this.commands.interactionCommands.cache.push(module.structure.message)
            Logger.info('Loaded new message command: ' + module.structure.message.name)
          } else if (e === 4) {
            module.structure.customIDs.forEach(e => {
              this.commands.interactionCommands.customIDs.set(e, name)
            })
            Logger.info('Loaded new component command: ' + name)
          }
        })

        if (module.structure.aliases.length > 0 && !module.structure.type.includes(0)) Logger.warn('If you want to use aliases in ' + name + ', you have to set the type as prefix.')
        if (module.structure.customIDs.length > 0 && !module.structure.type.includes(4)) Logger.warn('If you want to use customIDs in ' + name + ', you have to set the type as component.')
      }
      Logger.done('Commands loaded successfully')
    },
    deploy: async () => {
      Logger.info('Deploying commands')
      const commandsList = await this.application.commands.fetch()
    
      let isDiff = false
    
      if (commandsList.size !== this.commands.interactionCommands.cache.length) {
        isDiff = true
      } else {
        this.commands.interactionCommands.cache.forEach(e => {
          commandsList.every(command => {
            if (e === command.name) {
              isDiff = true
            }
            return command
          })
        })
      }
    
      if (isDiff === true || this.options.overwriteCommands === true) {
        await this.application.commands.set(this.commands.interactionCommands.cache)
        Logger.done('Commands deployed successfully')
      } else {
        Logger.done('Commands already deployed')
      }
    }
  }

  events = {
    load: async () => {
      Logger.info('Loading events')
      for (const event of fs.readdirSync(process.cwd() + '/events')) {
        const module = await import(process.cwd() + '/events/' + event)

        if (module.structure.once) {
          this.once(module.structure.event, (...args) => module.run(this, ...args))
        } else {
          this.on(module.structure.event, (...args) => module.run(this, ...args))
        }

        this.events[module.structure.event] = module

        Logger.info('Loaded new event: ' + module.structure.event)
      }

      Logger.done('Events loaded successfully')
    }
  }

  handlers = {
    load: async () => {
      Logger.info("Loading handlers")

      for (const handler of fs.readdirSync(process.cwd() + '/handlers')) {
        const module = await import(process.cwd() + '/handlers/' + handler)

        this.handlers[module.structure.name] = new Handler(module, process.cwd() + '/handlers/' + handler)

        if (this.handlers[module.structure.name].autorun === true) {
          await this.handlers[module.structure.name].run(this)
        }

        Logger.info('Loaded new handler: ' + module.structure.name)
      }

      Logger.done('Handlers loaded successfully')
    }
  }

  db = new Database()

  constructor (overwriteCommands = false) 
  {
    super(...arguments)
  }

  launch = async () => {
    Logger.info('Starting Discord Bot')

    try {
      await this.commands.load()
      await this.events.load()
      await this.handlers.load()
      Logger.info('Client connecting to Discord')
      await this.login(this.options.token || process.env.DISCORD_TOKEN)
      await this.commands.deploy()
    } catch (err) {
      if (err.code === 'HTTPError') {
        Logger.error("Client couldn't connect to Discord")
        process.exit(1)
      } else {
        Logger.error('Error while handling bot')
        console.error(err)
        process.exit(1)
      }
    }
  }

  stop = async () => {
    Logger.info('Stopping Discord Bot')
    await this.destroy()
    Logger.info('Stopped Discord Bot')
  }
}