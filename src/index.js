require('dotenv').config();
const { Client, IntentsBitField, cleanCodeBlockContent, channelLink, EmbedBuilder  } = require('discord.js');
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
        console.log(messageCoin.bet)
        const botMove = getMove();
        //Rock Logic
        if (interaction.customId === 'rock')
        {
            if (botMove === 'rock')
            {
                const embed = new EmbedBuilder().setTitle('It\'s a tie!').setFooter({ text: 'Play again!' });
                interaction.update({ embeds: [embed] });
                return;
            }
            else if (botMove === 'paper')
            {
                messageCoin.coins -= messageCoin.bet;
                await messageCoin.save().catch((error) => console.log(error));
                const embed = new EmbedBuilder().setTitle('You lose!').setFooter({ text: 'Play again!' });
                embed.setColor('Red');
                interaction.update({ embeds: [embed] });
                return;
            
            }
            else if (botMove === 'scissors')
            {
                
                messageCoin.coins += messageCoin.bet;
                await messageCoin.save().catch((error) => console.log(error));
                const embed = new EmbedBuilder().setTitle('You win!').setFooter({ text: 'Play again!' });
                embed.setColor('Green');
                interaction.update({ embeds: [embed] });
                return;
            }
            else
            {
                console.log('Error');
                return;
            }
        }
        //Paper Logic
        if (interaction.customId === 'paper')
        {
        if (botMove === 'rock')
        {
            const embed = new EmbedBuilder().setTitle('You win!').setFooter({ text: 'Play again!' });
            embed.setColor('Green');
            messageCoin.coins += messageCoin.bet;
            await messageCoin.save().catch((error) => console.log(error));
            interaction.update({ embeds: [embed] });
        }
        else if (botMove === 'scissors')
        {
            const embed = new EmbedBuilder().setTitle('You lose!').setFooter({ text: 'Play again!' });
            embed.setColor('Red');
            messageCoin.coins -= messageCoin.bet;
            await messageCoin.save().catch((error) => console.log(error));
            interaction.update({ embeds: [embed] });
        }
        else if (botMove === 'paper')
        {
            const embed = new EmbedBuilder().setTitle('It\'s a tie!').setFooter({ text: 'Play again!' });
            interaction.update({ embeds: [embed] });
        }
        else
        {
            console.log('Error');
            return;
        }
        //Scissors Logic
        if (interaction.customId === 'scissors')
        {
            if (botMove === 'rock')
            {
                const embed = new EmbedBuilder().setTitle('You lose!').setFooter({ text: 'Play again!' });
                embed.setColor('Red');
                messageCoin.coins -= messageCoin.bet;
                await messageCoin.save().catch((error) => console.log(error));
                interaction.update({ embeds: [embed] });
            }
            else if (botMove === 'scissors')
            {
                const embed = new EmbedBuilder().setTitle('It\'s a tie!').setFooter({ text: 'Play again!' });
                interaction.update({ embeds: [embed] });
            }
            else if (botMove === 'paper')
            {
                const embed = new EmbedBuilder().setTitle('You win!').setFooter({ text: 'Play again!' });
                embed.setColor('Green');
                messageCoin.coins += messageCoin.bet;
                await messageCoin.save().catch((error) => console.log(error));
                interaction.update({ embeds: [embed] });
            }
            else
            {
                console.log('Error');
                return;
            }
        }

       
    }
    });
    client.login(process.env.TOKEN);  
} catch (error) {
    console.log(error);
}
})();


