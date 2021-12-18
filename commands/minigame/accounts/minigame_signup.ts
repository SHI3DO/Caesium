import {
   MessageActionRow,
   MessageButton,
   MessageEmbed,
} from 'discord.js';
import { ICommand } from 'wokcommands';

import minigamedb from '../../../db/minigamedb';

function embedmaker(title: string, name: string, value: string) {
   const embed = new MessageEmbed()
      .setFooter('Developed by shi3do#2835')
      .setColor('#FA747D')
      .setTitle(`${title}`)
      .addFields([
         {
            name: `${name}`,
            value: `${value}`,
         },
      ]);

   return embed;
}

export default {
   category: 'Minigame',
   description: '매우 즐거운!',

   slash: true,

   callback: async ({ interaction }) => {
      const embed = new MessageEmbed()
         .setFooter('Developed by shi3do#2835')
         .setColor('#FA747D')
         .setTitle('Caesium 미니게임')
         .addFields([
            {
               name: '가입하시겠습니까?',
               value: '아래 버튼을 눌러주세요!',
            },
         ]);
      const row = new MessageActionRow()
         .addComponents(
            new MessageButton()
               .setCustomId('yes')
               .setLabel('예')
               .setStyle('SUCCESS'),
         )
         .addComponents(
            new MessageButton()
               .setCustomId('no')
               .setLabel('아니요')
               .setStyle('DANGER'),
         );

      interaction.reply({
         embeds: [embed],
         components: [row],
      });
   },
} as ICommand;
