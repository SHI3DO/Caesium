import { Application, MessageEmbed } from 'discord.js';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { ICommand } from 'wokcommands';


export default {
   category: 'Utilities',
   description: 'User Info',

   slash: true,

   options: [
      {
         name: 'user',
         description: 'user',
         required: true,
         type: ApplicationCommandOptionTypes.USER
      }
   ],

   callback: ({ interaction }) => {
      const embed = new MessageEmbed()
         .setTitle(`${interaction.options.getUser('user')?.username}#${interaction.options.getUser('user')?.discriminator}`)
         .setColor('#FA747D')
         .setThumbnail(`${interaction.options.getUser('user')?.displayAvatarURL({dynamic: true})}`)
         .addFields([
            {
               name: 'User ID',
               value: `${interaction.options.getUser('user')?.id}`,
               inline: true,
            },
            {
               name: 'Created at',
               value: `${interaction.options.getUser('user')?.createdAt}`,
               inline: true
            }
         ]);

      interaction.reply({
         embeds: [embed]
      })
   },
} as ICommand;
