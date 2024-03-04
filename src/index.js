require('dotenv').config();
const { Client, IntentsBitField, cleanCodeBlockContent  } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});







function getMove() {
    const replies = ['paper', 'rock', 'scissors' ];
    const random = Math.floor(Math.random() * 3)
    
    return replies[random]
}


client.on('interactionCreate', (interaction) =>
{
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

}) 


client.login(process.env.TOKEN);