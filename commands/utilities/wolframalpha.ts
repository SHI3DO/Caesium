import { ICommand } from 'wokcommands';
import 'dotenv/config';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';

function resembed(ques: string, answer: string) {
   const embed = new MessageEmbed()
      .setFooter('Developed by shi3do#2835')
      .setColor('#FA747D')
      .setTitle(ques)
      .addFields([
         {
            name: 'Answer',
            value: `${answer}`,
            inline: true,
         },
      ]);

   return embed;
}

export default {
   category: 'Utilities',
   description:
      'Compute expert-level answers using Wolfram’s breakthroughalgorithms, knowledgebase and AI technology',

   options: [
      {
         name: 'query',
         description: 'Enter what you want to calculate or know about',
         required: true,
         type: ApplicationCommandOptionTypes.STRING,
      },
   ],
   slash: true,

   callback: async ({ interaction }) => {
      var embed;
      var query;
      try {
         query = interaction.options.getString('query');

         const url = `https://caesiumpy.vercel.app/wolframalpha/${
            process.env.WOLFRAMALPHA_KEY
         }?query=${encodeURIComponent(query || '0')}`;

         interaction.deferReply()

         const res = await axios.get(url);

         embed = resembed(String(query), res.data);

         interaction.editReply({
             embeds: [embed]
         })

      } catch (err) {
        query = interaction.options.getString('query');
         console.log(err);
         interaction.deferReply()
         embed = resembed(String(query), 'Error Occured');
         interaction.editReply({
            embeds: [embed]
        })
      }
   },
} as ICommand;
