const { Client, Message, Interaction } = require('discord.js');
const Coin = require('./kicksCoinSchema.js');

/**
 * 
 * @param {Client} client 
 * @param {Interaction} message 
 */

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
            message.reply(`You have ${messageCoin.coins} coins!`);
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

    } catch (error) {
        console.log(error);
    }
}
