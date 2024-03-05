require('dotenv').config();
const { Client, IntentsBitField, cleanCodeBlockContent, channelLink  } = require('discord.js');
const mongoose = require('mongoose'); 
const { RPS } = require('./events/rps.js');
const { Logger } = require('./events/logger.js');
const { Balance } = require('./events/balance.js');
const { Give } = require('./events/give.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


(async () => {
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to the database');
    Logger(client);
    RPS(client);
    //Check for balance
    client.on('interactionCreate', (interaction) => 
    {
        if (interaction.commandName === 'balance')
        {
        Balance(client, interaction);
        return;
        }
    });
    //Check for give
    client.on('interactionCreate', (interaction) => 
    {
        if (interaction.commandName === 'give')
        {
            Give(client, interaction);
            return;
        }
    });

    client.login(process.env.TOKEN);  
} catch (error) {
    console.log(error);
}
})();


