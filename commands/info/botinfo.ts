import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
   category: 'Info',
   description: 'Caesium Bot Info',

   slash: 'both',

   callback: async ({ message, interaction }) => {
      const row = new MessageActionRow()
         .addComponents(
            new MessageButton()
               .setLabel('Invite Me!')
               .setURL(
                  'https://discord.com/api/oauth2/authorize?client_id=921244242934923334&permissions=8&scope=bot%20applications.commands',
               )
               .setStyle('LINK'),
         )
         
         .addComponents(
            new MessageButton()
               .setLabel('Docs')
               .setURL('https://shio7113.gitbook.io/caesium/')
               .setStyle('LINK'),
         );

      const embed = new MessageEmbed()
         .setTitle('Caesium Bot Info')
         .setColor('#FA747D')
         .addFields([
            {
               name: 'DEV',
               value: 'shi3do#2835',
               inline: true,
            },
         ]);

      if (message) {
         await message.reply({
            embeds: [embed],
            components: [row],
         });
      }

      if (interaction) {
         await interaction.reply({
            embeds: [embed],
            components: [row],
         });
      }
   },
} as ICommand;
