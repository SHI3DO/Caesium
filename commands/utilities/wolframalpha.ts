import { ICommand } from 'wokcommands';
import 'dotenv/config';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import axios from 'axios';

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
     testOnly: true,

   callback: async ({ interaction }) => {
       const query = interaction.options.getString('query')
       console.log(query)
       const url = `https://caesiumpy.vercel.app/wolframalpha/${process.env.WOLFRAMALPHA_KEY}?query={query}`
       console.log(url)
       const res = await axios.get(url)
      interaction.reply(`${query}: ${res.data}`);
   },
} as ICommand;
