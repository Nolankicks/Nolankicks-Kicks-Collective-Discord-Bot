require('dotenv').config();
const { Client, IntentsBitField, cleanCodeBlockContent, channelLink  } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});






const { Logger } = require('./events/logger.js');
Logger(client);

const { RPS } = require('./events/rps.js');
RPS(client);

client.login(process.env.TOKEN);