import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

import minigamedb from '../../../../db/minigamedb';
import 'dotenv/config';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';

export default {
   category: 'Minigame',
   description: '미니게임_도박_관리',
   ownerOnly: true,
   slash: true,
   options: [
      {
         name: 'user',
         description: '관리할 유저',
         required: true,
         type: ApplicationCommandOptionTypes.USER,
      },
      {
         name: 'addvalue',
         description: '추가할 양',
         required: true,
         type: ApplicationCommandOptionTypes.NUMBER,
      },
   ],

   callback: async ({ interaction }) => {
      try {
         if (
            await minigamedb.findOne({
               UserID: `${interaction.options.getUser('user')?.id}`,
            })
         ) {
            var coinValue = await minigamedb.findOne({
               UserID: `${interaction.options.getUser('user')?.id}`,
            });
            const NewcoinValue =
               coinValue.Coin + interaction.options.getNumber('addvalue');
            setTimeout(async () => {
               await minigamedb.updateOne(
                  { UserID: `${interaction.options.getUser('user')?.id}` },
                  { Coin: NewcoinValue },
               );
            }, 1000);

            interaction.reply(
               `${
                  interaction.options.getUser('user')?.id
               } ${NewcoinValue}, Done.`,
            );
         } else {
            const embed = new MessageEmbed()
               .setFooter(`Developed by ${process.env.MAINDEV}`)
               .setColor('#FA747D')
               .setTitle('계정 정보가 존재하지 않습니다.')
               .addFields([
                  {
                     name: 'Caesium_Casino_Admin_Coin_Management',
                     value: '유저가 가입하지 않았습니다.',
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
