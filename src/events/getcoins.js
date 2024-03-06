const { Client, Message, Interaction } = require('discord.js');
const Coin = require('./kicksCoinSchema.js');


module.exports["GetCoins"] = async (client, message) => {
    if (!message.inGuild()) return;
    if (message.author.bot) return;
    const query = {
        userID: message.user.id,
        guildID: message.guild.id,
    };
    try {
        const messageCoin = await Coin.findOne(query);
        if (messageCoin)
        {
            console.log(messageCoin.coins);
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
        
    }
}