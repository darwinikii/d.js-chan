import DiscordJS from 'discord.js'
import Client from './src/class/Client.js'

const client = new Client(
    {
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
        ],
//        token: "",
        overwriteCommands: false,
        prefix: "!"
    }
)

await client.launch()