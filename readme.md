# <samp>d.js-chan</samp>

The simplified Discord bot commands & events handler built with discord.js version 14 and written in JavaScript. This handler can load up to 5 different type of commands; Prefix, Slash, User context, Message context and Components(Button, Menu, Modal).

Difference with other handlers 

- Easy to use
- System for adding data to custom id
- Automatic deploy system for commands
- Each command in its own file. No need to use other files for button commands
- Everything is ready create commands and run it
- Can work with discord.js/builders

## Commands/Events structure and special functions

> **Note**
> This handler uses **ES6** modules system.

###  Command/Structure:
```ts
export const structure = {
  data: {
    name: string,
    description: string,
    (other options for discord api...)
  },
  user: {
    name: string,
    (other options for discord api...)
  },
  message: {
    name: string,
    (other options for discord api...)
  },
  type: [number, number], // 0 is Prefix, 1 is Slash, 2 is User, 3 is Message, 4 is Component Example: [1, 4] this is slash command with buttons
  aliases: [string],
  customIDs: [string]
}
```

### Command/Execution:

```ts
args<Prefix>: [string] // Arguments for command
args<Button, Menu, Modal>: string // The data attached to custom id using CustomIDBuilder

export async function executePrefix (client, message, args) {

}

export async function executeSlash (client, interaction) {

}

export async function executeUser (client, interaction) {

}

export async function executeMessage (client, interaction) {

}

export async function executeButton (client, interaction, args) {
  
};

export async function executeMenu (client, interaction, args) {

};

export async function executeModal (client, interaction, args) {

}
```

### Event/Structure:
```ts
export const structure = {
  event: string,
  once: boolean
}
```

### Event/Execution:
```ts
export function run (client) {
  
}
```

### Logging:
```ts
  import { log, config } from '../src/functions.js'
  log('Client successfully connected to Discord', 'done')

  log(string, string<Logging type>) Types: info, err, warn, done and <empty> is for debug
```

### Config:
```ts
  import { log, config } from '../src/functions.js'
  console.log(config().TOKEN)
```

### CustomID creation:
```ts
  import CustomIDBuilder from '../src/class/CustomIDBuilder.js'

  CustomIDBuilder(customid, data) // data is returned as args in component commands

  example:
    new DiscordJS.ButtonBuilder()
      .setCustomId(CustomIDBuilder('ping', 'expand'))
      .setLabel('GOD MODE')
      .setStyle(DiscordJS.ButtonStyle.Danger)
```

## Requirements
### Packages:
- **colors** v^1.4.0
- **discord.js** v^14.11.0
- **moment** v^latest
- **moment-duration-format** v^latest

moment and moment-duration-format is not really required for all the handler. These are only required for ping command.

### Platforms:
- **Node.js** v^16.9.0

For downloading all packages automaticly
```
npm install
```

## Setup
1. Download repository
2. Fill `config.json`

```ts
{
    "TOKEN": string, // Bot token
    "logging": false, // Debug logging
    "webServer": false, // For uptiming in hosting services like repl.it
    "prefix": string //Bot prefix
}
```

3. To start your bot, run `node .` or `npm run start`.
4. Enjoy. =)


## Contributors
<img src="https://contrib.rocks/image?repo=darwinikii/d.js-chan">

## License
I'm just a kid, I don't know license things. Use as you like bro