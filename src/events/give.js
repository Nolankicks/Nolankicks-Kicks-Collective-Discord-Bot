const { Client, Message, Interaction } = require('discord.js');
const Coin = require('./kicksCoinSchema.js');
const { EmbedBuilder } = require('discord.js');
/**
 * 
 * @param {Client} client 
 * @param {Interaction} message 
 */

module.exports["Give"] = async (client, message) => {

    if (!message.inGuild()) return;
    const user = message.options.getUser('user');
    const numbertoGive = message.options.getInteger('amount');
    
    const recieverQuery = {
        userID: user.id,
        guildID: message.guild.id,
    };
    const senderQuery = {
        userID: message.user.id,
        guildID: message.guild.id,
    };
    console.log(recieverQuery);
    const messageCoin = await Coin.findOne(senderQuery);
    try {
        if (message.user.id === user.id) 
        {
            const giveYourSelf = new EmbedBuilder().setTitle('You can\'t give yourself coins!').setFooter({ text: 'You can only give coins to other people!' });
            message.reply({ embeds: [giveYourSelf] });
            return;
        }

        const recieverCoins = await Coin.findOne(recieverQuery);
        console.log(recieverCoins.coins);
        
        if (recieverCoins)
        {
            if (messageCoin.coins >= numbertoGive)
            {
            const newCoins = recieverCoins.coins + numbertoGive;
            const embed = new EmbedBuilder().setTitle(`You gave ${numbertoGive} coins to ${user.username}!`).setFooter({ text: `They now have ${newCoins}` });
            recieverCoins.coins += numbertoGive;
            messageCoin.coins -= numbertoGive;
            message.reply({ embeds: [embed] });
            await messageCoin.save().catch((error) => console.log(error));
            await recieverCoins.save().catch((error) => console.log(error));
            return;
            }
            else
            {
                const notEnoughCoins = new EmbedBuilder().setTitle('You don\'t have enough coins!').setFooter({ text: 'You can\'t give more coins than you have!' });
                message.reply({ embeds: [notEnoughCoins] });
                return;
            }
        }
        if (recieverCoins.coins === null || recieverCoins.coins === undefined)
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
        console.log(error);
    }
    
}