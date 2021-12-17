import { MessageActionRow, MessageButton } from 'discord.js';
import { ICommand } from 'wokcommands';


export default {
   category: 'Info',
   description: 'Caesium Bot Info',

   slash: 'both',

   callback: async ({ message, interaction }) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('Invite_Me')
        .setLabel('Invite Me!')
        .setStyle('PRIMARY')
    )
      if (message) {
          await message.reply({
              content: 'aaa',
              components: [row]
          })
      }
      if (interaction) {
          await interaction.reply({
              content: 'aaa',
              components: [row]
          })
      }
   },
} as ICommand;
