import DiscordJS from 'discord.js'
import colors from 'colors'
import path from 'path'
import fs from 'fs'

import { log } from './functions.js'

export default async (client, token) => {
  try {
    if (client.handledBefore === false) {
      await loadCommands(client)
      await loadEvents(client)
    }
    log('Client connecting to Discord', 'info')
    await client.login(token)
    await deployCommands(client)
    client.handledBefore = true
  } catch (err) {
    if (err.code === 'HTTPError') {
      log("Client couldn't connect to Discord", 'err')
      process.exit(1)
    } else {
      log('Error while handling bot', 'err')
      console.error(err)
      process.exit(1)
    }
  }
}

async function loadCommands (client) {
  log('Loading commands', 'info')
  for (const command of fs.readdirSync('./commands')) {
    const module = await import('../commands/' + command)
    const name = module.structure.data.name || module.structure.user.name || module.structure.message.name

    module.structure.type.forEach(e => {
      if (e === 0) {
        client.prefixCommands.commands.set(module.structure.data.name, module)
        module.structure.aliases.forEach(e => {
          client.prefixCommands.aliases.set(e, module.structure.data.name)
        })
        log('Loaded new prefix command: ' + module.structure.data.name, 'info')
      } else if (e === 1) {
        client.interactionCommands.list.set(module.structure.data.name, module)
        client.interactionCommands.cache.push(module.structure.data)
        log('Loaded new interaction command: ' + module.structure.data.name, 'info')
      } else if (e === 2) {
        client.interactionCommands.list.set(module.structure.user.name, module)
        client.interactionCommands.cache.push(module.structure.user)
        log('Loaded new user command: ' + module.structure.user.name, 'info')
      } else if (e === 3) {
        client.interactionCommands.list.set(module.structure.message.name, module)
        client.interactionCommands.cache.push(module.structure.message)
        log('Loaded new message command: ' + module.structure.message.name, 'info')
      } else if (e === 4) {
        module.structure.customIDs.forEach(e => {
          client.interactionCommands.customIDs.set(e, name)
        })
        log('Loaded new component command: ' + name, 'info')
      }
    })

    if (module.structure.aliases.length > 0 && !module.structure.type.includes(0)) log('If you want to use aliases in ' + name + ', you have to set the type as prefix.', 'warning')
    if (module.structure.customIDs.length > 0 && !module.structure.type.includes(4)) log('If you want to use customIDs in ' + name + ', you have to set the type as component.', 'warning')
  }
  log('Commands loaded successfully', 'done')
};

async function loadEvents (client) {
  log('Loading events', 'info')
  for (const event of fs.readdirSync('./events')) {
    const module = await import('../events/' + event)

    if (module.structure.once) {
      client.once(module.structure.event, (...args) => module.run(client, ...args))
    } else {
      client.on(module.structure.event, (...args) => module.run(client, ...args))
    };

    log('Loaded new event: ' + module.structure.event, 'info')
  }
  log('Events loaded successfully', 'done')
};

async function deployCommands (client) {
  log('Deploying commands', 'info')
  const commandsList = await client.application.commands.fetch()

  let isDiff = false

  if (commandsList.size !== client.interactionCommands.cache.length) {
    isDiff = true
  } else {
    client.interactionCommands.cache.forEach(e => {
      commandsList.every(command => {
        if (e === command.name) {
          isDiff = true
        }
        return command
      })
    })
  }

  if (isDiff === true) {
    await client.application.commands.set(client.interactionCommands.cache)
    log('Commands deployed successfully', 'done')
  } else {
    log('Commands already deployed', 'done')
  }
};
