import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

function pingembed(restlatency: any, apilatency: any) {
   const embed = new MessageEmbed()
      .setFooter('Developed by shi3do#2835')
      .setColor('#FA747D')
      .addFields([
         {
            name: 'REST Latency',
            value: `${restlatency}ms`,
            inline: true,
         },
         {
            name: 'API Latency',
            value: `${apilatency}ms`,
            inline: true,
         },
      ]);

   return embed;
}

export default {
   category: 'Bot/info',
   description: 'Latency',

   slash: 'both',

   callback: ({ message, interaction, client }) => {
      var embed;
      if (message) {
         embed = pingembed(
            message.createdTimestamp - Date.now(),
            Math.round(client.ws.ping),
         );
      }
      if (interaction) {
         embed = pingembed(
            interaction.createdTimestamp - Date.now(),
            Math.round(client.ws.ping),
         );
      }

      return embed;
   },
} as ICommand;
