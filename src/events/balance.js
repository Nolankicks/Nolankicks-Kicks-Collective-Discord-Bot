const { Client, Message, Interaction } = require('discord.js');
const Coin = require('./kicksCoinSchema.js');

/**
 * 
 * @param {Client} client 
 * @param {Interaction} message 
 */
const { EmbedBuilder } = require('discord.js');
module.exports["Balance"] = async (client, message) => {


    if (!message.inGuild()) return;

    const query = {
        userID: message.user.id,
        guildID: message.guild.id,
    };
    try {
        const messageCoin = await Coin.findOne(query);
        
        if (messageCoin)
        {
           console.log(messageCoin.coins);
        //message.reply(`You have ${messageCoin.coins} coins!`);
        const embed = new EmbedBuilder()
        .setTitle('Balance').
        setDescription(`You have ${messageCoin.coins} coins!`)
        .setFooter({ text: 'Play some games to earn more!' });
        
        message.reply({ embeds: [embed] });
        return;
        }
        else
        {
            const newCoin = new Coin({
                userID: message.user.id,
                guildID: message.guild.id,
                coins: 20,
            });

            await newCoin.save();
        }
        return;
    } catch (error) {
        console.log(error);
    }
}
