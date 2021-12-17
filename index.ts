import DiscordJS, { Intents } from 'discord.js';
import WOKCommands from 'wokcommands';
import path from 'path';
import 'dotenv/config';

const client = new DiscordJS.Client({
   intents: new Intents(32767),
});

client.on('ready', async () => {
   new WOKCommands(client, {
      commandsDir: path.join(__dirname, 'commands'),
      typeScript: true,
      testServers: ['749595288280498188'],
      botOwners: ['643116087919116298'],
      mongoUri: process.env.MONGO_URI,
   });

   console.log('Caesium - 1.0.0 SHI3DO');
});

client.login(process.env.TOKEN);
