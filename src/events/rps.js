const { Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, cleanCodeBlockContent, Interaction  } = require('discord.js');
const Coin = require('./kicksCoinSchema.js');
const { EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose'); 
module.exports["RPS"] = async (Client) => 
{
    const client = Client;
    //Get random move
  
    const buttons = [
        {
            id: 'rock',
            label: 'Rock',
            style: ButtonStyle.Primary,
        },
        {
            id: 'paper',
            label: 'Paper',
            style: ButtonStyle.Primary,
        },
        {
            id: 'scissors',
            label: 'Scissors',
            style: ButtonStyle.Primary,
        },
    ]
    //When the user uses the command
    client.on('interactionCreate', async (interaction) =>
    {
        try {
            const row = new ActionRowBuilder();
            buttons.forEach((button) => {
                row.components.push(
                    new ButtonBuilder().setCustomId(button.id).setLabel(button.label).setStyle(ButtonStyle.Primary)
                )
            });
            if (interaction.commandName === 'rps')
            {
                
                const bet = interaction.options.getInteger('bet');
                const query = {
                    userID: interaction.user.id,
                    guildID: interaction.guild.id,
                };
                const messageCoin = await Coin.findOne(query);
                const embed = new EmbedBuilder().setTitle('Choose your move!').setFooter({ text: `You have ${messageCoin.coins} coins` });
                messageCoin.bet = bet;
                await messageCoin.save().catch((error) => console.log(error));
                await interaction.reply(
                    {
                        embeds: [embed],
                        components: [row],
                    }
                )
                
            }
        } catch (error) {
            console.log(error);
        }
    });
}