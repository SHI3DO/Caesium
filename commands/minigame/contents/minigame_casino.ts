import { MessageEmbed } from 'discord.js';
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
         type: ApplicationCommandOptionTypes.NUMBER,
      },
   ],

   callback: async ({ interaction }) => {
      try {
         if (await minigamedb.findOne({ UserID: `${interaction.user.id}` })) {
            var coinValue = await minigamedb.findOne({
               UserID: `${interaction.user.id}`,
            });
            if (
               interaction.options.getNumber('value')! > coinValue.Coin ||
               interaction.options.getNumber('value')! < 0 ||
               interaction.options.getNumber('value')! % 1 != 0
            ) {
               const embed = new MessageEmbed()
                  .setFooter(`Developed by ${process.env.MAINDEV}`)
                  .setColor('#FA747D')
                  .setTitle('배팅금액을 다시 확인해주세요.')
                  .addFields([
                     {
                        name: `${interaction.options.getNumber('value')}`,
                        value: '배팅금액은 현재 가진 금액보다 크거나 음수이거나 소수가 될 수 없어요.',
                        inline: true,
                     },
                  ]);

               interaction.reply({
                  embeds: [embed],
               });
            } else {
               var userInfo = await minigamedb.findOne({
                  UserID: `${interaction.user.id}`,
               });
               var pp = Math.random() * 100;
               var casinoembed;
               if (pp > 100 - userInfo.Casino_PP) {
                  await minigamedb.updateOne(
                     { UserID: `${interaction.user.id}` },
                     {
                        Casino_PP: 29,
                        Coin:
                           interaction.options.getNumber('value')! * 3 +
                           userInfo.Coin,
                     },
                  );

                  casinoembed = new MessageEmbed()
                     .setFooter(`Developed by ${process.env.MAINDEV}`)
                     .setColor('#FA747D')
                     .setTitle('Caesium_Casino')
                     .addFields([
                        {
                           name: `잔액 ${
                              interaction.options.getNumber('value')! * 3 +
                              userInfo.Coin
                           } 확률 ${userInfo.Casino_PP}%`,
                           value: '도박성공',
                           inline: true,
                        },
                     ]);
               } else {
                  await minigamedb.updateOne(
                     { UserID: `${interaction.user.id}` },
                     {
                        Casino_PP: Math.round(
                           userInfo.Casino_PP +
                              (100 - userInfo.Casino_PP) * 0.05,
                        ),
                        Coin:
                           userInfo.Coin -
                           interaction.options.getNumber('value')!,
                     },
                  );
                  var admincoin = await minigamedb.findOne({
                     UserID: `${process.env.ADMINID}`,
                  });
                  await minigamedb.updateOne(
                     { UserID: `${process.env.ADMINID}` },
                     {
                        Coin:
                           admincoin.Coin +
                           interaction.options.getNumber('value'),
                     },
                  );
                  casinoembed = new MessageEmbed()
                     .setFooter(`Developed by ${process.env.MAINDEV}`)
                     .setColor('#FA747D')
                     .setTitle('Caesium_Casino')
                     .addFields([
                        {
                           name: `잔액 ${
                              userInfo.Coin -
                              interaction.options.getNumber('value')!
                           } 확률 ${userInfo.Casino_PP}%`,
                           value: '실패',
                           inline: true,
                        },
                     ]);
               }

               interaction.reply({
                  embeds: [casinoembed],
               });
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
