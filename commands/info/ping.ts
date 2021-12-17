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
   category: 'Info',
   description: 'Latency',

   slash: true,

   callback: ({ interaction, client }) => {
      var embed;
      if (interaction) {
         embed = pingembed(
            Math.abs(interaction.createdTimestamp - Date.now()),
            Math.round(client.ws.ping),
         );
      }

      return embed;
   },
} as ICommand;
