import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'ping! pong!',

    slash: 'both',
    testOnly: true,

    callback: ({message, interaction, client}) => {
        if (message) {
            message.reply(`Latency is ${message.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
        }
        if (interaction) {
            interaction.reply(`Latency is ${interaction.createdTimestamp - Date.now()}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
        }
    }, 
} as ICommand