require('dotenv').config();
const { Client, IntentsBitField, cleanCodeBlockContent, channelLink, EmbedBuilder, ActionRowBuilder  } = require('discord.js');
const mongoose = require('mongoose'); 
const { RPS } = require('./events/rps.js');
const { Logger } = require('./events/logger.js');
const { Balance } = require('./events/balance.js');
const { Give } = require('./events/give.js');
const Coin = require('./events/kicksCoinSchema.js');
const { Leaderboard } = require('./events/leaderboard.js');
const { Daily } = require('./events/daily.js');

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


(async () => {
try {

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to the database');
    Logger(client);
    Leaderboard(client);
    RPS(client);
    client.on('messageCreate', async (message) => {
    });
    client.on('interactionCreate', async (interaction) => {
        if (interaction.commandName === 'daily')
        {
            
        }

    });
    //GetMove function
    
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
        const botMove = getMove();
        getMove();
        const intquery = {
            userID: interaction.user.id,
            guildID: interaction.guild.id,
        };
        const messageCoin = await Coin.findOne(intquery);
        console.log(messageCoin.bet)
        
        const row = new ActionRowBuilder();
        //Rock Logic
        if (messageCoin)
        {
        if (interaction.customId === 'rock')
        {

            if (botMove === 'rock')
            {
                const embed = new EmbedBuilder().setTitle('It\'s a tie!').setFooter({ text: 'Play again!' });
                interaction.update({ embeds: [embed], components: [] });
                getMove();
                return;
            }
            else if (botMove === 'paper')
            {
                messageCoin.coins -= messageCoin.bet;
                await messageCoin.save().catch((error) => console.log(error));
                const embed = new EmbedBuilder().setTitle('You lose!').setFooter({ text: 'Play again!' });
                embed.setColor('Red');
                interaction.update({ embeds: [embed], components: []});
                getMove();
                return;
            
            }
            else if (botMove === 'scissors')
            {
                if (messageCoin.bet == 0)
                {
                    messageCoin.coins += 1;
                }
                else
                {
                messageCoin.coins += messageCoin.bet;
                }
                await messageCoin.save().catch((error) => console.log(error));
                const embed = new EmbedBuilder().setTitle('You win!').setFooter({ text: 'Play again!' });
                embed.setColor('Green');
                interaction.update({ embeds: [embed], components: []});
                getMove();
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
            if (messageCoin.bet == 0)
            {
                messageCoin.coins += 1;
            }
            else
            {
            messageCoin.coins += messageCoin.bet;
            }
            await messageCoin.save().catch((error) => console.log(error));
            interaction.update({ embeds: [embed], components: [] });
            getMove();
            return;
        }
        else if (botMove === 'scissors')
        {
            const embed = new EmbedBuilder().setTitle('You lose!').setFooter({ text: 'Play again!' });
            embed.setColor('Red');
            messageCoin.coins -= messageCoin.bet;
            await messageCoin.save().catch((error) => console.log(error));
            interaction.update({ embeds: [embed], components: []});
            getMove();
            return;
        }
        else if (botMove === 'paper')
        {
            const embed = new EmbedBuilder().setTitle('It\'s a tie!').setFooter({ text: 'Play again!' });
            interaction.update({ embeds: [embed], components: []});
            getMove();
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
                interaction.update({ embeds: [embed], components: []});
                getMove();
                return;
            }
            else if (botMove === 'scissors')
            {
                const embed = new EmbedBuilder().setTitle('It\'s a tie!').setFooter({ text: 'Play again!' });
                interaction.update({ embeds: [embed], components: []});
                getMove();
                return;
            }
            else if (botMove === 'paper')
            {
                const embed = new EmbedBuilder().setTitle('You win!').setFooter({ text: 'Play again!' });
                embed.setColor('Green');
                if (messageCoin.bet == 0)
                {
                    messageCoin.coins += 1;
                }
                else
                {
                messageCoin.coins += messageCoin.bet;
                }
                await messageCoin.save().catch((error) => console.log(error));
                interaction.update({ embeds: [embed], components: []});
                getMove();
                return;
            }
            else
            {
                console.log('Error');
                return;
            }

        }
    }
    else
    {
        const newCoin = new Coin({
            userID: user.id,
            guildID: message.guild.id,
            coins: 20,
            lastDaily: new Date(),
        });

        await newCoin.save();
        interaction.reply('Coins have been added to the database!, please try again!');
        return;
    }
    }
    });
    client.login(process.env.TOKEN);  
} catch (error) {
    console.log(error);
}
})();


