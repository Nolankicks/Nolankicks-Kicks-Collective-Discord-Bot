const { Client, ButtonBuilder, ButtonStyle, ActionRowBuilder  } = require('discord.js');
const Coin = require('./kicksCoinSchema.js');
const { EmbedBuilder } = require('discord.js');
module.exports["RPS"] = async (Client) => 
{
    const client = Client;
    //Get random move
    function getMove() {
        const replies = ['paper', 'rock', 'scissors' ];
        const random = Math.floor(Math.random() * 3)
        
        return replies[random]
    }
    
    //When the user uses the command
    client.on('interactionCreate', async (interaction) =>
    {
        //Checks
        //Find the users coins
        const query = {
            userID: interaction.user.id,
            guildID: interaction.guild.id,
        };
        //Get the bet
        const bet = interaction.options.getInteger('bet');
        //Log the bet
        console.log(bet);
        //Check if the bet is negative
        if (bet < 0)
        {
            interaction.reply('You can\'t bet a negative amount of coins!');
            return;
        }
        const buttons = [
            {
                label: 'Rock',
                style: 'PRIMARY',
                customId: 'rock',
            },
            {
                label: 'Paper',
                style: 'PRIMARY',
                customId: 'paper',
            },
            {
                label: 'Scissors',
                style: 'PRIMARY',
                customId: 'scissors',
            }
        ]
        try {
            //Find the users coins
            const messageCoin = await Coin.findOne(query);
            console.log(messageCoin.coins);
                    //If the user doesn't have enough coins
        if (bet > messageCoin.coins)
        {
            interaction.reply(`You don't have enough coins! You have ${messageCoin.coins} coins!`);
            return;
        }
            //If the command is rps
            if (interaction.commandName === 'rps') 
            {
                
                const row = new ActionRowBuilder();

               try {
                buttons.forEach(async (button) => {
                    row.components.push(
                        new ButtonBuilder().setCustomId(button.customId).setLabel(button.label).setStyle(ButtonStyle.Primary),
                    )
                });
               } catch (error) {
                console.log(error);
               }
                interaction.reply({ content: 'Choose your move!', components: [row] });
            }
            const botMove = getMove();
            console.log(interaction.customId);
            if (interaction.customId === 'rock')
                {
                    console.log(interaction.customId);
                    if (botMove === 'rock') {
                        interaction.reply('I chose rock, it\'s a tie!');
                    } else if (botMove === 'paper') {
                        const paperLoss = new EmbedBuilder().setTitle('I chose paper, I win!').setFooter({ text: 'Better luck next time!' });
                        interaction.reply({ embeds: [paperLoss] });
                        messageCoin.coins -= bet;
                        await messageCoin.save().catch((error) => console.log(error));
                    } else {
                        const scissorsWin = new EmbedBuilder().setTitle('I chose scissors, you win!').setFooter({ text: 'Congratulations!' });
                        interaction.reply({ embeds: [scissorsWin] });
                        messageCoin.coins += bet;
                        if (messageCoin.coins == 0)
                        {
                            messageCoin.coins += 1;
                        }
                        await messageCoin.save().catch((error) => console.log(error));
                    }
                    return;
                }
                //If the player's move is paper
                if (interaction.customId === 'paper')
                {
                    if (botMove === 'rock') {
                        const rockWin = new EmbedBuilder().setTitle('I chose rock, you win!').setFooter({ text: 'Congratulations!' });
                        interaction.reply({ embeds: [rockWin] });
                        messageCoin.coins += bet;
                        await messageCoin.save().catch((error) => console.log(error));
                        if (messageCoin.coins == 0)
                        {
                            messageCoin.coins += 1;
                        }
                    } else if (botMove === 'paper') {
                        interaction.reply('I chose paper, it\'s a tie!');
                    } else {
                        const scissorsLoss = new EmbedBuilder().setTitle('I chose scissors, I win!').setFooter({ text: 'Better luck next time!' });
                        interaction.reply({ embeds: [scissorsLoss] });
                        messageCoin.coins -= bet;
                        await messageCoin.save().catch((error) => console.log(error));
                    }
                    return;
                }
                //If the player's move is scissors
                if (interaction.customId === 'scissors')
                {
                    if (botMove === 'rock') {
                        const rockLoss = new EmbedBuilder().setTitle('I chose rock, I win!').setFooter({ text: 'Better luck next time!' });
                        interaction.reply({ embeds: [rockLoss] });
                        messageCoin.coins -= bet;
                        await messageCoin.save().catch((error) => console.log(error));
                    } else if (botMove === 'paper') {
                        const paperWin = new EmbedBuilder().setTitle('I chose paper, you win!').setFooter({ text: 'Congratulations!' });
                        interaction.reply({ embeds: [paperWin] });
                        messageCoin.coins += bet;
                        if (messageCoin.coins == 0)
                        {
                            messageCoin.coins += 1;
                        }
                        await messageCoin.save().catch((error) => console.log(error));
                    } else {
                        interaction.reply('I chose scissors, it\'s a tie!');
                    }
                    return;
                }
            if (messageCoin.coins === null || messageCoin.coins === undefined)
            {
                const newCoin = new Coin({
                    userID: user.id,
                    guildID: message.guild.id,
                    coins: 20,
                });
    
                await newCoin.save();
            }
            return;
        } catch (error) {
        //Catch and log the error
        console.log(error);     
        }
    });
}