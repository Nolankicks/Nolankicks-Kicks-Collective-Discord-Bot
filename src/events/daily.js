const { Mongoose } = require("mongoose");
const { Message, Interaction } = require("discord.js");
const Coin = require("./kicksCoinSchema.js");
const dailyAmount = 20;
/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
module.exports["Daily"] = async (client, interaction) => {
    if (!interaction.inGuild())
    {
        interaction.reply('You can only use this command in a server!');
    }
    
    const query = {
        userID: interaction.user.id,
        guildID: interaction.guild.id,
    };
    try {
        await interaction.deferReply();
        const user = await Coin.findOne(query);
        if (user)
        {
            const lastday = user.lastDaily.toDateString();
            const currentDate = new Date().toDateString();

            if (lastday === currentDate)
            {
                const embed = new EmbedBuilder().setTitle('You have already claimed your daily coins!').setFooter({ text: 'You can claim your daily coins again tomorrow!' });
                await interaction.editReply({ embeds: [embed] });
            }
            return;
        }
        else
        {
            user = new Coin({
                ...query,
                lastDaily: new Date(),
            });
        }
        user.coins += dailyAmount;
        await user.save();
        const embed = new EmbedBuilder().setTitle(`You have claimed ${dailyAmount} coins!`).setFooter({ text: `You now have ${user.coins} coins` });
        interaction.editReply({ embeds: [embed] });
        return;
    } catch (error) {
        console.log(error);
    }
}