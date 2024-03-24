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

        if (numbertoGive <= 0)
        {
            const givePositive = new EmbedBuilder().setTitle('Invalid amount!').setFooter({ text: 'Your amount must be greater than zero!' });
            message.reply({ embeds: [givePositive] });
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
        else
        {
            const newCoin = new Coin({
                userID: user.id,
                guildID: message.guild.id,
                coins: 20,
            });

            await newCoin.save();
            message.reply('User has been added to the database!');
        }
        return;

    } catch (error) {
        console.log(error);
    }
    
}