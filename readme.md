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
target: Member or Message object // The target of context command
customID: string //custom ID of component

export async function executePrefix (client, message, args) {

}

export async function executeSlash (client, interaction) {

}

export async function executeUser (client, interaction, target) {

}

export async function executeMessage (client, interaction, target) {

}

export async function executeButton (client, interaction, customID, args) {
  
};

export async function executeMenu (client, interaction, customID, args) {

};

export async function executeModal (client, interaction, customID, args) {

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

### Handler/Structure:
```ts
export const structure = {
  name: string,
  autorun: boolean,
  type: number //0 is for service handlers, 1 is for function handlers
}
```

#### Handler Types

1. Service Handler : It works continuously with your bot and can be started and stopped when necessary. It constantly communicates with the bot.
2. Function Handler : It works as needed. They are very similar to functions

### Handler/Execution:
```ts
export function run (client, <...>) {
  
}
```

```ts
export function stop (client, <...>) {
  
}
```

### Database:
Database is integrated into client. For other docs click [here](https://quickdb.js.org/en/basic-usage/#set--get)
```ts
    // Setting an object in the database:
    await client.db.set("userInfo", { difficulty: "Easy" });
    // -> { difficulty: 'Easy' }

    // Getting an object from the database:
    await client.db.get("userInfo");
    // -> { difficulty: 'Easy' }
```
### Database/Cache:
Everything same as database. The only difference is that it is not permanent. For other docs click [here](https://quickdb.js.org/en/basic-usage/#set--get)
```ts
    // Setting an object in the database:
    await client.db.cache.set("userInfo", { difficulty: "Easy" });
    // -> { difficulty: 'Easy' }

    // Getting an object from the database:
    await client.db.cache.get("userInfo");
    // -> { difficulty: 'Easy' }
```

### Logging:
```ts
  import { Logger } from '../src/functions.js'
  Logger.done('Client successfully connected to Discord')

  Logger.<Logging type>(string) //Types: info, error, warn, done and debug
```

### Config:
```ts
  import { Logger } from '../src/functions.js'

  Logger.debug(client.options.overwriteCommands) -> false
  Logger.debug(client.options.prefix) -> !
```

> You can set other variables in index.js
```ts
  const client = new Client(
    {
      overwriteCommands: false,
      prefix: "!"
    }
  )
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

> You can find more informative files in `./examples` folder

### Sharding:
> First, you'll need to have a file that you'll be launching from now on, rather than your original index.js file. It's highly recommended renaming that to bot.js and naming this new file to index.js instead. Copy & paste the following snippet into your new index.js file.

```ts
import DiscordJS from 'discord.js'

const manager = new DiscordJS.ShardingManager('./bot.js', { token: 'your-token-goes-here' });

manager.on('shardCreate', shard => Logger.info(`Launched shard ${shard.id}`));

manager.spawn();
```
> Same as discord.js documentation. You can access it from [here](https://discordjs.guide/sharding/#when-to-shard)

## Requirements
### Packages:
- **colors** v^latest
- **discord.js** v^14.14.1
- **moment** v^latest
- **moment-duration-format** v^latest
- **quick.db** v^latest
- **better-sqlite3** v^latest

moment and moment-duration-format is not really required for all the handler. These are only required for ping command.

better-sqlite3 and quick.db is required for integrated database. If you are advanced user you can change with your favorite database solution.

### Platforms:
- **Node.js** v20.10.0

For downloading all packages automaticly
```
npm install
```

## Setup
1. Download repository
2. Fill `index.js`

```ts
const client = new Client(
    {
        intents: [
            <...>
        ],
        partials: [
            <...>
        ],
        token: "************************************", //Required
        overwriteCommands: false, //Optional
        prefix: "!" //Optional
        ... //These options will be pass to discord.js
    }
)
```

3. To start your bot, run `node .` or `npm run start`.
4. Enjoy. =)


## Contributors
<img src="https://contrib.rocks/image?repo=darwinikii/d.js-chan">

## License
I'm just a kid, I don't know license things. Use as you like bro