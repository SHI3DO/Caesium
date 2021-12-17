import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const client = new DiscordJS.Client({
    intents: new Intents(32767)
})

client.on('ready', () => {
    console.log('Caesium - 1.0.0 SHI3DO')
})

client.login(process.env.TOKEN)