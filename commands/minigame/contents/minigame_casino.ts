import {
   MessageActionRow,
   MessageButton,
   MessageComponentInteraction,
   MessageEmbed,
} from 'discord.js';
import { ICommand } from 'wokcommands';

import minigamedb from '../../../db/minigamedb';
import 'dotenv/config';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';

export default {
   category: 'Minigame',
   description: '미니게임_도박',

   slash: true,
   options: [
       {
           name: 'value',
           description: '배팅할 금액',
           required: true,
           type: ApplicationCommandOptionTypes.NUMBER
       }
   ],

   callback: async ({ interaction }) => {
      try {
         if (await minigamedb.findOne({ UserID: `${interaction.user.id}` })) {
            var coinValue = await minigamedb.findOne({ UserID: `${interaction.user.id}` })
            if (interaction.options.getNumber('value')! > coinValue.Coin) {
                const embed = new MessageEmbed()
                .setFooter(`Developed by ${process.env.MAINDEV}`)
                .setColor('#FA747D')
                .setTitle('배팅금액을 다시 확인해주세요.')
                .addFields([
                    {
                        name: `${interaction.options.getNumber('value')} > ${coinValue.Coin}`,
                        value: '배팅금액은 현재 가진 금액보다 클 수 없어요.',
                        inline: true
                    }
                ])

                interaction.reply({
                    embeds: [embed]
                })
            } else {
                console.log('te')
            }
            
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
