require('dotenv').config();
const { Client, IntentsBitField, cleanCodeBlockContent, channelLink  } = require('discord.js');
const mongoose = require('mongoose'); 
const { RPS } = require('./events/rps.js');
const { Logger } = require('./events/logger.js');
const { Balance } = require('./events/balance.js');
const { Give } = require('./events/give.js');
const Coin = require('./events/kicksCoinSchema.js');
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
    const rps = RPS(client);
    //GetMove function
    function getMove() {
        const replies = ['paper', 'rock', 'scissors' ];
        const random = Math.floor(Math.random() * 3)
        
        return replies[random]
    }
    //Check for balance
    client.on('interactionCreate', (interaction) => 
    {
        if (interaction.commandName === 'balance')
        {
        Balance(client, interaction);
        return;
        }
    });
    //Check for /give
    client.on('interactionCreate', (interaction) => 
    {
        if (interaction.commandName === 'give')
        {
            Give(client, interaction);
            return;
        }
    });
    //Check for /RPS
    client.on('interactionCreate', async (interaction) =>
    {
        if (!interaction.isButton()) return;
        const query = {
            userID: interaction.user.id,
            guildID: interaction.guild.id,
        };
        const messageCoin = await Coin.findOne(query);
        console.log(rps.row);
        if (interaction.customId === 'rock')
        {
            interaction.reply( `You have${messageCoin.coins} coins` );
        }
    });
    client.login(process.env.TOKEN);  
} catch (error) {
    console.log(error);
}
})();


