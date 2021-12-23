import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

import minigamedb from '../../../db/minigamedb';
import 'dotenv/config';

export default {
   category: 'Minigame',
   description: '미니게임_도박',

   slash: true,

   callback: async ({ interaction }) => {
      try {
         if (await minigamedb.findOne({ UserID: `${interaction.user.id}` })) {
            var coinValue = await minigamedb.findOne({
               UserID: `${interaction.user.id}`,
            });
            const embed = new MessageEmbed()
               .setFooter(`Developed by ${process.env.MAINDEV}`)
               .setColor('#FA747D')
               .setTitle('잔고')
               .addFields([
                  {
                     name: 'Coin',
                     value: `${coinValue.Coin}`,
                     inline: true,
                  },
               ]);

            interaction.reply({
               embeds: [embed],
            });
         } else {
            const embed = new MessageEmbed()
               .setFooter(`Developed by ${process.env.MAINDEV}`)
               .setColor('#FA747D')
               .setTitle('계정 정보가 존재하지 않습니다.')
               .addFields([
                  {
                     name: '해결 방법',
                     value: '/minigame_signup을 사용해서 가입해주세요.',
                     inline: true,
                  },
               ]);

            interaction.reply({
               embeds: [embed],
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
