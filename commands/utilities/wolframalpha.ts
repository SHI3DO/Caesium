import { ICommand } from 'wokcommands';
import { WolframClient } from 'node-wolfram-alpha';
import 'dotenv/config';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';

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
      const wolframclient = new WolframClient(process.env.WOLFRAMALPHA_KEY!);
      const result = await wolframclient.query(
         String(interaction.options.getString('query')),
         { podindex: 1 },
      );
      console.log(interaction.options.getString('query'));
      interaction.reply({
         content: JSON.stringify(result.data),
      });
   },
} as ICommand;
