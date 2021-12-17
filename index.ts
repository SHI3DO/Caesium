import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'

dotenv.config()

const client = new DiscordJS.Client({
    intents: new Intents(32767)
})

client.on('ready', () => {
    console.log('Caesium - 1.0.0 SHI3DO')

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['749595288280498188'],
    })
})


client.login(process.env.TOKEN)