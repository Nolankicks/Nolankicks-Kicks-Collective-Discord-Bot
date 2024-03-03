require('dotenv').config();
const { Client, IntentsBitField  } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('messageCreate', (message) => {
    if (message.has === '/paper')
    {
        message.reply('sizzors')
        message.reply('you suck bitch, I win')
    }
});
client.on('messageCreate', (message) => {
    if (message.content === '/scissors')
    {
        message.reply('rock')
        message.reply('you suck bitch, I win')
    }
});
client.on('messageCreate', (message) => {
    if (message.content === '/rock')
    {
        message.reply('paper')
        message.reply('you suck bitch, I win')
    }
});

client.login(process.env.TOKEN);



