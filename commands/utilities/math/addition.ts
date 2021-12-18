import { ICommand } from 'wokcommands';
import 'dotenv/config';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';

export default {
   category: 'Utilities/Math',
   description: 'addition',

   options: [
      {
         name: 'num1',
         description: 'first one',
         required: true,
         type: ApplicationCommandOptionTypes.NUMBER,
      },
      {
         name: 'num2',
         description: 'second one',
         required: true,
         type: ApplicationCommandOptionTypes.NUMBER,
      },
   ],
   slash: true,

   callback: ({ interaction }) => {
      const num1 = interaction.options.getNumber('num1') || 0;
      const num2 = interaction.options.getNumber('num2') || 0;
      interaction.reply(`${num1} + ${num2} = ${num1 + num2}`);
   },
} as ICommand;
