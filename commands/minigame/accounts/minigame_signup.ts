import {
   MessageActionRow,
   MessageButton,
   MessageComponentInteraction,
   MessageEmbed,
} from 'discord.js';
import { ICommand } from 'wokcommands';
import 'dotenv/config';
import minigamedb from '../../../db/minigamedb';

export default {
   category: 'Minigame',
   description: '세슘봇의 미니게임들입니다.',

   slash: true,

   callback: async ({ interaction, channel }) => {
      try {
         if (await minigamedb.findOne({ UserID: `${interaction.user.id}` })) {
            const embed = new MessageEmbed()
               .setFooter(`Developed by ${process.env.MAINDEV}`)
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
               .setFooter(`Developed by ${process.env.MAINDEV}`)
               .setColor('#FA747D')
               .setTitle('Caesium 미니게임')
               .addFields([
                  {
                     name: '가입하시겠습니까?',
                     value: '아래 버튼을 눌러주세요.',
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

            const filter = (btnInt: MessageComponentInteraction) => {
               return interaction.user.id === btnInt.user.id;
            };

            const collector = channel.createMessageComponentCollector({
               filter,
               max: 1,
               time: 1000 * 10,
            });

            collector.on('collect', (i: MessageComponentInteraction) => {
               if (i.customId === 'yes') {
                  setTimeout(async () => {
                     await new minigamedb({
                        UserID: `${interaction.user.id}`,
                        Coin: 0,
                        Created: `${interaction.createdAt}`,
                        isBanned: false,
                        Casino_PP: 29,
                     }).save();
                  }, 1000);

                  const yesembed = new MessageEmbed()
                     .setFooter(`Developed by ${process.env.MAINDEV}`)
                     .setColor('#FA747D')
                     .setTitle('Caesium 미니게임')
                     .addFields([
                        {
                           name: '가입완료',
                           value: '감사합니다.',
                        },
                     ]);

                  i.update({
                     embeds: [yesembed],
                     components: [],
                  });
               } else {
                  const noembed = new MessageEmbed()
                     .setFooter(`Developed by ${process.env.MAINDEV}`)
                     .setColor('#FA747D')
                     .setTitle('Caesium 미니게임')
                     .setFields([
                        {
                           name: '취소',
                           value: '최소되었습니다.',
                        },
                     ]);

                  i.update({
                     embeds: [noembed],
                     components: [],
                  });
               }
            });

            collector.on('end', async collection => {
               if (collection.first()?.customId === undefined) {
                  const timeoutembed = new MessageEmbed()
                     .setFooter(`Developed by ${process.env.MAINDEV}`)
                     .setColor('#FA747D')
                     .setTitle('Caesium 미니게임')
                     .setFields([
                        {
                           name: '시간초과',
                           value: '응답시간이 초과되었습니다.',
                        },
                     ]);
                  await interaction.editReply({
                     embeds: [timeoutembed],
                     components: [],
                  });
               }
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
