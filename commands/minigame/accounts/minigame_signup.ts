import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

import minigamedb from '../../../db/minigamedb';

export default {
   category: 'Minigame',
   description: '매우 즐거운!',

   slash: true,

   callback: async ({ interaction }) => {
      try {
         if (await minigamedb.findOne({ UserID: `${interaction.user.id}` })
         ) {
            const embed = new MessageEmbed()
               .setFooter('Developed by shi3do#2835')
               .setColor('#FA747D')
               .setTitle('Error')
               .addFields([
                  {
                     name: '이미 가입되셨어요!',
                     value: ':0',
                     inline: true,
                  },
               ]);

            interaction.reply({
               embeds: [embed],
            });
         } else {
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
         }
      } catch (err) {
         console.log(err);
         const embed = new MessageEmbed()
            .setFooter('Developed by shi3do#2835')
            .setColor('#FA747D')
            .setTitle('Error')
            .addFields([
               {
                  name: '죄송합니다',
                  value: ':pleading_face:',
                  inline: true,
               },
            ]);

         interaction.reply({
            embeds: [embed],
         });
      }
   },
} as ICommand;
