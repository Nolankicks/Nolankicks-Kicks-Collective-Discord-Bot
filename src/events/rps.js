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
        const messageCoin = await Coin.findOne(query);
        
});
}