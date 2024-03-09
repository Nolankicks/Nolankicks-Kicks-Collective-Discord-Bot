const Coin = require('./kicksCoinSchema.js');
const { Client, Interaction } = require('discord.js'); 
module.exports["Daily"] = async (Client, Interaction) => {

const client = Client;
const interaction = Interaction;
const dailyAmount = 20;
if (!interaction.inGuild()){
    interaction.reply('You can only use this command in a server!');
    return;
}

try {
    await interaction.deferReply();
    let query = {
        userID: interaction.member.id,
        guildID: interaction.guild.id,
    };

    let user = await Coin.findOne(query);

    if (user)
    {
        console.log('user is a user');
    }
    else
    {
        user = new Coin({
            userID: interaction.member.id,
            guildID: interaction.guild.id,
            DailyDate: new Date(),
            coins: 20,
            
        });
    }
    await user.save();
    user.coins += 20;
    console.log(user);
    await user.save();
    interaction.editReply(`You have been given ${dailyAmount} coins!`);
} catch (error) {
    console.log(error);
}
}